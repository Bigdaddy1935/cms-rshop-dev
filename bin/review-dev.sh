#!/usr/bin/env bash
# Review changes the developer pushed to the `dev` branch before
# merging into `main` and deploying.
#
# Workflow this script supports:
#   1. Fetch latest from GitHub (both branches)
#   2. Show commits/files that are on dev but not on main
#   3. Print the next-step commands for reviewing in depth, merging,
#      and deploying
#
# Run it whenever the developer says "I pushed":
#   bin/review-dev.sh
#
# The script is read-only — it never modifies branches or pushes
# anywhere. All state-changing commands are printed for you to run
# manually after reviewing.

set -euo pipefail

# Move to the repo root regardless of where the script is invoked from.
cd "$(dirname "$0")/.."

YELLOW=$'\e[33m'
GREEN=$'\e[32m'
CYAN=$'\e[36m'
DIM=$'\e[2m'
RESET=$'\e[0m'

echo "${CYAN}→ Fetching origin/dev and origin/main…${RESET}"
git fetch origin dev main --quiet

# Counts of how dev relates to main on the remote.
ahead=$(git rev-list --count origin/main..origin/dev)
behind=$(git rev-list --count origin/dev..origin/main)

if [ "$ahead" = "0" ] && [ "$behind" = "0" ]; then
  echo "${GREEN}✓ origin/dev is identical to origin/main — nothing to review.${RESET}"
  exit 0
fi

if [ "$ahead" = "0" ]; then
  echo "${GREEN}✓ origin/dev has no new commits beyond origin/main.${RESET}"
  if [ "$behind" != "0" ]; then
    echo "${DIM}  (dev is $behind commit(s) behind main — developer should pull/rebase)${RESET}"
  fi
  exit 0
fi

echo ""
echo "${YELLOW}→ origin/dev is $ahead commit(s) ahead of origin/main.${RESET}"
if [ "$behind" != "0" ]; then
  echo "${YELLOW}  (and $behind commit(s) behind — dev will need a rebase before clean merge)${RESET}"
fi

echo ""
echo "${CYAN}→ Commits on dev not on main:${RESET}"
git log --oneline --no-merges origin/main..origin/dev

echo ""
echo "${CYAN}→ Files changed:${RESET}"
git diff --stat origin/main..origin/dev

# Surface any files that smell risky (lockfiles, env, infrastructure)
# so they get a closer look during review.
risky=$(git diff --name-only origin/main..origin/dev | \
  grep -E '(package-lock\.json|pnpm-lock\.yaml|yarn\.lock|\.env|Dockerfile|captain-definition|middleware\.ts|next\.config\.(js|mjs|ts))$' || true)
if [ -n "$risky" ]; then
  echo ""
  echo "${YELLOW}⚠ Risky files touched — review carefully:${RESET}"
  echo "$risky" | sed 's/^/    /'
fi

cat <<EOF

${CYAN}→ Inspect the full diff:${RESET}
    git diff origin/main..origin/dev
    # or just one file
    git diff origin/main..origin/dev -- path/to/file

${CYAN}→ Try the dev branch locally (build + run):${RESET}
    git checkout dev && git pull --ff-only origin dev
    npm ci
    npm run build           # confirm it builds clean
    npm run dev             # smoke-test in browser if needed

${GREEN}→ Approve & merge into main, then deploy:${RESET}
    git checkout main
    git pull --ff-only origin main
    git merge --no-ff origin/dev -m "Merge dev: <one-line summary of what landed>"
    git push origin main
    caprover deploy         # ships main to rshop-cms

${YELLOW}→ Reject & ask for changes:${RESET}
    # Just don't merge. Tell the developer what to fix; they'll push
    # more commits to dev and you re-run this script.

EOF
