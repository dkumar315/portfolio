#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

fail() {
  echo "REPOSITORY AUDIT FAILED: $1" >&2
  exit 1
}

echo "---- repository audit: package-manager state ----"

[ -f package.json ] || fail "package.json is missing"
[ -f package-lock.json ] || fail "package-lock.json is missing"

OTHER_LOCKS="$(
  for file in yarn.lock pnpm-lock.yaml bun.lock bun.lockb; do
    if [ -e "$file" ]; then
      printf '%s\n' "$file"
    fi
  done
)"

if [ -n "$OTHER_LOCKS" ]; then
  echo "$OTHER_LOCKS"
  fail "multiple package-manager lockfiles are present"
fi

node <<'NODE'
const fs = require("fs");

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));

if (!lock.packages || !lock.packages[""]) {
  throw new Error("package-lock.json has no root package entry");
}

if (pkg.name !== lock.packages[""].name) {
  throw new Error(
    `package name mismatch: package.json=${pkg.name} lock=${lock.packages[""].name}`,
  );
}

if (pkg.version !== lock.packages[""].version) {
  throw new Error(
    `package version mismatch: package.json=${pkg.version} lock=${lock.packages[""].version}`,
  );
}

if (!pkg.scripts?.check) {
  throw new Error("package.json is missing the check script");
}

if (!pkg.scripts?.["audit:forensic"]) {
  throw new Error("package.json is missing audit:forensic");
}

console.log(`Package identity: ${pkg.name}@${pkg.version}`);
console.log(`Lockfile version: ${lock.lockfileVersion}`);
NODE

echo "Package-manager state: PASS"

echo
echo "---- repository audit: ignore rules ----"

for candidate in \
  node_modules/example.txt \
  .next/example.txt \
  coverage/example.txt \
  playwright-report/example.txt \
  test-results/example.txt \
  .env.local
do
  if ! git check-ignore -q "$candidate"; then
    fail "expected ignored path is not ignored: $candidate"
  fi
done

echo "Ignore rules: PASS"

echo
echo "---- repository audit: filename portability ----"

python - <<'PY'
import subprocess
import sys

raw = subprocess.check_output(["git", "ls-files", "-z"])
paths = [item.decode("utf-8") for item in raw.split(b"\0") if item]

case_map = {}
collisions = []

for path in paths:
    folded = path.casefold()
    previous = case_map.get(folded)

    if previous is not None and previous != path:
        collisions.append((previous, path))
    else:
        case_map[folded] = path

bad_names = []
for path in paths:
    parts = path.split("/")

    if any(part != part.strip() for part in parts):
        bad_names.append(path)

    if any(any(ord(char) < 32 for char in part) for part in parts):
        bad_names.append(path)

if collisions:
    print("Case-insensitive filename collisions:")
    for left, right in collisions:
        print(f"  {left} <-> {right}")
    sys.exit(1)

if bad_names:
    print("Non-portable tracked filenames:")
    for path in sorted(set(bad_names)):
        print(f"  {path}")
    sys.exit(1)

print(f"Tracked filename portability: PASS ({len(paths)} files)")
PY

echo
echo "---- repository audit: generated outputs ----"

GENERATED_TRACKED="$(
  git ls-files \
    | grep -E '(^|/)(node_modules|\.next|coverage|playwright-report|test-results)(/|$)' \
    || true
)"

if [ -n "$GENERATED_TRACKED" ]; then
  echo "$GENERATED_TRACKED"
  fail "generated output is tracked"
fi

echo "Generated outputs: PASS"

echo
echo "---- repository audit: executable-file policy ----"

UNEXPECTED_EXECUTABLES="$(
  git ls-files -s \
    | awk '$1 == "100755" {print $4}' \
    | grep -Ev '^scripts/[A-Za-z0-9._-]+\.sh$' \
    || true
)"

if [ -n "$UNEXPECTED_EXECUTABLES" ]; then
  echo "$UNEXPECTED_EXECUTABLES"
  fail "unexpected executable tracked file"
fi

echo "Executable-file policy: PASS"

echo
echo "---- repository audit: CI compatibility targets ----"

[ -f .github/workflows/ci.yml ] || fail ".github/workflows/ci.yml is missing"

grep -Eq '24' .github/workflows/ci.yml \
  || fail "CI workflow no longer references Node 24"

grep -Eq '26' .github/workflows/ci.yml \
  || fail "CI workflow no longer references Node 26"

echo "CI compatibility targets: PASS"

echo
echo "---- repository audit: installed dependency tree ----"

npm ls --depth=0 >/tmp/portfolio-npm-ls.txt 2>&1 || {
  cat /tmp/portfolio-npm-ls.txt
  fail "npm dependency tree is invalid"
}

cat /tmp/portfolio-npm-ls.txt
echo "Installed dependency tree: PASS"

echo
echo "REPOSITORY AUDIT: PASS"
