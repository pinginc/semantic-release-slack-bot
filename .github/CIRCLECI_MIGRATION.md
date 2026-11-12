# CircleCI migration

GitHub Actions runs lint, build, test before releasing main. CircleCI retains only no-op workflow names for compatibility with existing required checks.

Merge the shared `library-release` action first. Configure the npm trusted publisher for `pinginc/semantic-release-slack-bot`, workflow `ci.yml`, with no environment. Publishing runs on GitHub-hosted Ubuntu with OIDC; `NPM_TOKEN` is used only to install private dependencies. The release job uses the pinginc-ci App, with `PINGCI_TOKEN` as its fallback, so release events can start downstream workflows.

The release rules and changelog sections match the CircleCI orb. Generated files are validated and saved as artifacts; developers commit needed updates. Coverage and test output remain downloadable from Actions. Configure `SLACK_WEBHOOK` for release notifications; external Codecov delivery needs a separate Actions credential handoff.

Apply the required-check policy after these jobs have reported on the PR. Publishing is guarded to main and is not exercised by the PR run.
