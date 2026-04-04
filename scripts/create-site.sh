#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# create-site.sh — Scaffold a new site in the monorepo
# Usage: bash scripts/create-site.sh <site-name>
# Example: bash scripts/create-site.sh my-client-site
# ============================================================

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMPLATE_DIR="$REPO_ROOT/sites/site-template"
SITES_DIR="$REPO_ROOT/sites"
WORKFLOW_FILE="$REPO_ROOT/.github/workflows/deploy.yml"

# ---- Validate input ----------------------------------------
if [ -z "${1:-}" ]; then
  echo "ERROR: Please provide a site name."
  echo "Usage: bash scripts/create-site.sh <site-name>"
  exit 1
fi

SITE_NAME="$1"

# Enforce kebab-case slug (lowercase letters, numbers, hyphens only)
if ! echo "$SITE_NAME" | grep -qE '^[a-z][a-z0-9-]+$'; then
  echo "ERROR: Site name must be lowercase, start with a letter, and contain only letters, numbers, and hyphens."
  echo "Example: my-client-site"
  exit 1
fi

SITE_DIR="$SITES_DIR/$SITE_NAME"

if [ -d "$SITE_DIR" ]; then
  echo "ERROR: Site '$SITE_NAME' already exists at $SITE_DIR"
  exit 1
fi

# ---- Copy template -----------------------------------------
echo "Creating site: $SITE_NAME"
cp -r "$TEMPLATE_DIR" "$SITE_DIR"

# ---- Replace SITE_NAME placeholder in all files ------------
find "$SITE_DIR" -type f \( -name "*.json" -o -name "*.js" -o -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.md" -o -name ".env.example" \) | while read -r file; do
  sed -i "s/SITE_NAME/$SITE_NAME/g" "$file"
done

# ---- Create .env.local from .env.example -------------------
if [ -f "$SITE_DIR/.env.example" ]; then
  cp "$SITE_DIR/.env.example" "$SITE_DIR/.env.local"
  echo "  Created .env.local — fill in values before deploying."
fi

# ---- Add site entry to GitHub Actions workflow -------------
if [ -f "$WORKFLOW_FILE" ]; then
  # Insert after the marker comment, adding filter entry for new site
  FILTER_ENTRY="            $SITE_NAME:\n              - 'sites/$SITE_NAME/**'\n              - 'packages/**'"
  sed -i "s|            # --- GENERATED SITE ENTRIES (do not remove this comment) ---|            # --- GENERATED SITE ENTRIES (do not remove this comment) ---\n$FILTER_ENTRY|" "$WORKFLOW_FILE"
  echo "  Added '$SITE_NAME' to deploy.yml path filters."
fi

# ---- Install dependencies ----------------------------------
echo "Installing dependencies..."
cd "$REPO_ROOT" && pnpm install

# ---- Git: stage new site -----------------------------------
cd "$REPO_ROOT"
git add "sites/$SITE_NAME"
[ -f "$WORKFLOW_FILE" ] && git add "$WORKFLOW_FILE"

echo ""
echo "✓ Site '$SITE_NAME' created at sites/$SITE_NAME"
echo ""
echo "Next steps:"
echo "  1. Edit sites/$SITE_NAME/src/app/page.tsx to build your site"
echo "  2. Run: pnpm dev --filter=@primecred/$SITE_NAME"
echo "  3. Connect to Vercel: bash scripts/link-vercel.sh $SITE_NAME"
echo "  4. Add GitHub secret: VERCEL_PROJECT_ID_$(echo "$SITE_NAME" | tr '[:lower:]-' '[:upper:]_')"
echo "  5. Commit and push — GitHub Actions deploys automatically"
echo ""
