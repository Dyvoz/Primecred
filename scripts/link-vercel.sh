#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# link-vercel.sh — Connect a site directory to a Vercel project
# Prerequisites: vercel CLI installed and logged in (`vercel login`)
# Usage: bash scripts/link-vercel.sh <site-name>
# ============================================================

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_NAME="${1:-}"

if [ -z "$SITE_NAME" ]; then
  echo "ERROR: Usage: bash scripts/link-vercel.sh <site-name>"
  exit 1
fi

SITE_DIR="$REPO_ROOT/sites/$SITE_NAME"

if [ ! -d "$SITE_DIR" ]; then
  echo "ERROR: Site '$SITE_NAME' not found at $SITE_DIR"
  echo "Run: bash scripts/create-site.sh $SITE_NAME first"
  exit 1
fi

if ! command -v vercel &> /dev/null; then
  echo "ERROR: Vercel CLI not found. Install it with: npm install -g vercel"
  exit 1
fi

echo "Linking $SITE_NAME to Vercel..."
echo "You will be prompted to create or connect a Vercel project."
echo ""

# Run vercel link from the site directory
cd "$SITE_DIR" && vercel link --yes

# Extract project info
PROJECT_ID=$(node -e "console.log(require('./.vercel/project.json').projectId)")
ORG_ID=$(node -e "console.log(require('./.vercel/project.json').orgId)")
SECRET_KEY=$(echo "$SITE_NAME" | tr '[:lower:]-' '[:upper:]_')

echo ""
echo "✓ Linked '$SITE_NAME' to Vercel!"
echo ""
echo "Add this secret to GitHub (Settings → Secrets → Actions):"
echo "  Name:  VERCEL_PROJECT_ID_$SECRET_KEY"
echo "  Value: $PROJECT_ID"
echo ""
echo "One-time secrets (if not already added):"
echo "  VERCEL_TOKEN   = your Vercel API token (vercel.com/account/tokens)"
echo "  VERCEL_ORG_ID  = $ORG_ID"
echo ""
echo "In the Vercel dashboard, set the Root Directory for this project to:"
echo "  sites/$SITE_NAME"
echo ""
