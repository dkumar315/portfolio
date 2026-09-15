#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

fail() {
  echo "FORENSIC AUDIT FAILED: $1" >&2
  exit 1
}

echo "---- forensic audit: tracked-file inventory ----"

SUSPICIOUS_TRACKED="$(
  git ls-files \
    | grep -Ei '(^|/)(\.env($|\.)|.*\.(pem|key|p12|pfx|crt|cer|der|jks|keystore|sqlite|sqlite3|db|zip|7z|rar|tar|tgz|gz|pdf|docx|xlsx|pptx))$' \
    || true
)"

if [ -n "$SUSPICIOUS_TRACKED" ]; then
  echo "$SUSPICIOUS_TRACKED"
  fail "unexpected secret/archive/database/document file is tracked"
fi

if ! git check-ignore -q .env.local; then
  fail ".env.local is not ignored"
fi

echo "Tracked-file inventory: PASS"

echo
echo "---- forensic audit: public-source privacy scan ----"

PUBLIC_PATHS=(src public README.md)

scan_public() {
  local pattern="$1"
  local label="$2"

  local matches
  matches="$(
    grep -RInI -E "$pattern" "${PUBLIC_PATHS[@]}" 2>/dev/null || true
  )"

  if [ -n "$matches" ]; then
    echo "$matches"
    fail "$label"
  fi
}

scan_public '\bz[0-9]{7}\b' "student ID pattern found on the public surface"
scan_public 'href=["'\'']tel:' "telephone link found on the public surface"
scan_public '\+61[[:space:]()-]*[0-9][0-9[:space:]()-]{7,}' "Australian phone number pattern found on the public surface"
scan_public 'subclass[[:space:]]*(500|485)|permanent[[:space:]]+residen(cy|t)|employer[[:space:]]+sponsorship|visa[[:space:]]+sponsorship' "immigration/sponsorship detail found on the public surface"
scan_public '/scenario/(nodes|links)|/config/(operational-intent|thresholds)' "private NAT/ANCR implementation endpoint found on the public surface"
scan_public 'BEGIN[[:space:]]+(RSA|OPENSSH|EC|DSA)[[:space:]]+PRIVATE[[:space:]]+KEY' "private key material found on the public surface"
scan_public 'github_pat_[A-Za-z0-9_]{20,}|gh[pousr]_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9_-]{20,}' "credential/token pattern found on the public surface"
scan_public 'Compass[[:space:]]+IoT' "excluded project name found on the public surface"

EMAILS="$(
  grep -RhoEI '[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}' "${PUBLIC_PATHS[@]}" 2>/dev/null \
    | tr '[:upper:]' '[:lower:]' \
    | sort -u \
    || true
)"

UNEXPECTED_EMAILS="$(
  printf '%s\n' "$EMAILS" \
    | grep -v '^$' \
    | grep -v '^devaanshk1630@gmail\.com$' \
    || true
)"

if [ -n "$UNEXPECTED_EMAILS" ]; then
  echo "$UNEXPECTED_EMAILS"
  fail "unexpected email address found on the public surface"
fi

echo "Public-source privacy scan: PASS"

echo
echo "---- forensic audit: Git history sensitive-content scan ----"

HISTORY_PATCH="/tmp/portfolio-forensic-history.patch"

git log \
  --all \
  --no-ext-diff \
  --pretty=fuller \
  -p \
  -- \
  src \
  public \
  README.md \
  next.config.ts \
  package.json \
  .github \
  > "$HISTORY_PATCH"

scan_history() {
  local pattern="$1"
  local label="$2"

  local matches
  matches="$(
    grep -nE "$pattern" "$HISTORY_PATCH" | head -n 30 || true
  )"

  if [ -n "$matches" ]; then
    echo "$matches"
    fail "$label"
  fi
}

scan_history '\bz[0-9]{7}\b' "student ID pattern exists in public Git history"
scan_history 'href=["'\'']tel:' "telephone link exists in public Git history"
scan_history '\+61[[:space:]()-]*[0-9][0-9[:space:]()-]{7,}' "Australian phone pattern exists in public Git history"
scan_history '/scenario/(nodes|links)|/config/(operational-intent|thresholds)' "private NAT/ANCR endpoint exists in public Git history"
scan_history 'BEGIN[[:space:]]+(RSA|OPENSSH|EC|DSA)[[:space:]]+PRIVATE[[:space:]]+KEY' "private key material exists in public Git history"
scan_history 'github_pat_[A-Za-z0-9_]{20,}|gh[pousr]_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9_-]{20,}' "credential/token pattern exists in public Git history"
scan_history 'Compass[[:space:]]+IoT' "excluded project name exists in public Git history"

HISTORICAL_SUSPICIOUS_NAMES="$(
  git log --all --name-only --pretty=format: \
    | sed '/^$/d' \
    | sort -u \
    | grep -Ei '(^|/)(\.env($|\.)|.*\.(pem|key|p12|pfx|sqlite|sqlite3|db|zip|7z|rar|tar|tgz|gz|pdf|docx|xlsx|pptx))$' \
    || true
)"

if [ -n "$HISTORICAL_SUSPICIOUS_NAMES" ]; then
  echo "$HISTORICAL_SUSPICIOUS_NAMES"
  fail "sensitive/archive/document filename exists in Git history"
fi

echo "Git history sensitive-content scan: PASS"

echo
echo "---- forensic audit: historical blob-size scan ----"

LARGE_BLOBS="$(
  git rev-list --objects --all \
    | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' \
    | awk '$1 == "blob" && $3 > 5242880 {print $0}' \
    || true
)"

if [ -n "$LARGE_BLOBS" ]; then
  echo "$LARGE_BLOBS"
  fail "Git history contains a blob larger than 5 MiB"
fi

echo "Historical blob-size scan: PASS"

echo
echo "---- forensic audit: generated-artifact tracking scan ----"

GENERATED_TRACKED="$(
  git ls-files \
    | grep -E '(^|/)(\.next|coverage|playwright-report|test-results|node_modules)(/|$)' \
    || true
)"

if [ -n "$GENERATED_TRACKED" ]; then
  echo "$GENERATED_TRACKED"
  fail "generated output is tracked"
fi

echo "Generated-artifact tracking scan: PASS"

echo
echo "FORENSIC AUDIT: PASS"
