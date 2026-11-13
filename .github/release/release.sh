#!/usr/bin/env bash
set -euo pipefail

export RELEASE_TOOLS="$RUNNER_TEMP/library-release-tools"
# The optional Slack plugin reads this when not launched through an npm script.
export SEMANTIC_RELEASE_PACKAGE
SEMANTIC_RELEASE_PACKAGE=$(node -p "require('./package.json').name")
# npm trusted publishing must use OIDC, not the earlier dependency-read token.
unset NPM_TOKEN NODE_AUTH_TOKEN
# npm provenance currently requires a public source repository.
export NPM_CONFIG_PROVENANCE=false
node "$(dirname "$0")/release.mjs"
