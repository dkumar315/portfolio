#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

section() {
  printf '%s\n' "---- forensic audit: $1 ----"
}

fail() {
  printf '%s\n' "FORENSIC AUDIT FAILED: $1" >&2
  exit 1
}

section "tracked-file inventory"

if git ls-files | grep -E \
  '(^|/)(\.env($|\.)|credentials?($|\.)|id_(rsa|dsa|ecdsa|ed25519)($|\.)|.*\.(pem|p12|pfx|key))' \
  >/tmp/portfolio-forensic-tracked-sensitive.txt
then
  cat /tmp/portfolio-forensic-tracked-sensitive.txt
  fail "sensitive credential-style filename is tracked"
fi

if git ls-files | grep -E \
  '(^|/)(\.next|coverage|playwright-report|test-results|node_modules)(/|$)' \
  >/tmp/portfolio-forensic-generated.txt
then
  cat /tmp/portfolio-forensic-generated.txt
  fail "generated build/test output is tracked"
fi

echo "Tracked-file inventory: PASS"

section "public-source privacy scan"

if ! python3 <<'PY'
from pathlib import Path
import re

roots = [Path("src"), Path("public")]
extra_files = [Path("README.md")]

text_extensions = {
    ".cjs", ".css", ".html", ".js", ".jsx", ".json", ".md", ".mjs",
    ".svg", ".ts", ".tsx", ".txt", ".xml", ".yaml", ".yml",
}

approved_phone_variants = (
    "+61 431 821 862",
    r"\+61 431 821 862",
    "+61431821862",
    "tel:+61431821862",
)

checks = (
    ("UNSW zID", re.compile(r"\bz\d{7}\b", re.I)),
    ("student ID label", re.compile(r"\bstudent[ _-]?id\b", re.I)),
    ("visa subclass", re.compile(r"\bsubclass\s*(?:500|485)\b", re.I)),
    (
        "immigration sponsorship wording",
        re.compile(r"\bemployer\s+sponsorship\b", re.I),
    ),
    (
        "private key block",
        re.compile(r"BEGIN (?:RSA|OPENSSH|EC|DSA) PRIVATE KEY"),
    ),
    (
        "private client endpoint",
        re.compile(
            r"/(?:scenario/(?:nodes|links)|config/(?:operational-intent|thresholds))",
            re.I,
        ),
    ),
    (
        "unapproved tel link",
        re.compile(r"\btel:\+?[0-9][0-9\s-]{7,}", re.I),
    ),
    (
        "unapproved Australian phone",
        re.compile(r"\+61[\s0-9-]{8,}", re.I),
    ),
)

failures = []

def iter_files(root: Path):
    if not root.exists():
        return
    for path in root.rglob("*"):
        if path.is_file() and path.suffix.lower() in text_extensions:
            yield path

paths = []
for root in roots:
    paths.extend(iter_files(root) or [])
paths.extend(path for path in extra_files if path.exists())

for path in sorted(set(paths)):
    try:
        text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        continue

    sanitised = text
    for approved in approved_phone_variants:
        sanitised = sanitised.replace(approved, "")

    for label, pattern in checks:
        for match in pattern.finditer(sanitised):
            line = sanitised.count("\n", 0, match.start()) + 1
            failures.append(
                f"{path}:{line}: {label}: {match.group(0)!r}"
            )

if failures:
    print("\n".join(failures))
    raise SystemExit(1)
PY
then
  fail "private or unapproved public-surface material found"
fi

if command -v pdftotext >/dev/null 2>&1 \
  && [[ -f public/Devaansh-Kumar-Resume.pdf ]]
then
  pdftotext \
    public/Devaansh-Kumar-Resume.pdf \
    /tmp/portfolio-public-resume.txt

  if ! python3 <<'PY'
from pathlib import Path
import re

text = Path("/tmp/portfolio-public-resume.txt").read_text(
    encoding="utf-8",
    errors="ignore",
)

for approved in (
    "+61 431 821 862",
    "+61431821862",
    "0431 821 862",
):
    text = text.replace(approved, "")

checks = (
    re.compile(r"\bz\d{7}\b", re.I),
    re.compile(r"\bsubclass\s*(?:500|485)\b", re.I),
    re.compile(r"\bemployer\s+sponsorship\b", re.I),
)

for pattern in checks:
    match = pattern.search(text)
    if match:
        raise SystemExit(
            f"public resume contains disallowed private material: {match.group(0)!r}"
        )
PY
  then
    fail "public resume contains disallowed private material"
  fi
fi

echo "Public-source privacy scan: PASS"

section "Git history sensitive-content scan"

if ! python3 <<'PY'
import re
import subprocess

history = subprocess.check_output(
    ["git", "log", "--all", "-p", "--", "src", "public", "README.md"],
    text=True,
    errors="ignore",
)

for approved in (
    "+61 431 821 862",
    "+61431821862",
    "tel:+61431821862",
):
    history = history.replace(approved, "")

checks = (
    ("UNSW zID", re.compile(r"\bz\d{7}\b", re.I)),
    ("visa subclass", re.compile(r"\bsubclass\s*(?:500|485)\b", re.I)),
    (
        "private key block",
        re.compile(r"BEGIN (?:RSA|OPENSSH|EC|DSA) PRIVATE KEY"),
    ),
)

for label, pattern in checks:
    match = pattern.search(history)
    if match:
        raise SystemExit(
            f"history contains {label}: {match.group(0)!r}"
        )
PY
then
  fail "sensitive historical material found"
fi

echo "Git history sensitive-content scan: PASS"

section "historical blob-size scan"

LARGE_BLOBS="$(
  git rev-list --objects --all \
    | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' \
    | awk '$1 == "blob" && $3 > 5242880 { print }'
)"

if [[ -n "$LARGE_BLOBS" ]]; then
  printf '%s\n' "$LARGE_BLOBS"
  fail "Git history contains a blob larger than 5 MiB"
fi

echo "Historical blob-size scan: PASS"

section "generated-artifact tracking scan"

if git ls-files | grep -E \
  '(^|/)(\.next|coverage|playwright-report|test-results|node_modules)(/|$)' \
  >/tmp/portfolio-forensic-generated-final.txt
then
  cat /tmp/portfolio-forensic-generated-final.txt
  fail "generated artifact is tracked"
fi

echo "Generated-artifact tracking scan: PASS"

echo
echo "FORENSIC AUDIT: PASS"
