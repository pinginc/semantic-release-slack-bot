#!/usr/bin/env bash
set -euo pipefail

packages=(
	'semantic-release@^25' 'conventional-changelog-conventionalcommits@^9'
	'@semantic-release/commit-analyzer@^13' '@semantic-release/release-notes-generator@^14'
	'@semantic-release/changelog@^7' '@semantic-release/git@^11'
	'@semantic-release/github@^12' '@semantic-release/npm@^13'
)
if [[ -n ${SLACK_WEBHOOK:-} ]]; then
	packages+=('@timebyping/semantic-release-slack-bot@^1.1.12')
fi
npm install --prefix "$RUNNER_TEMP/library-release-tools" --no-save --package-lock=false --ignore-scripts --no-audit --no-fund "${packages[@]}"
