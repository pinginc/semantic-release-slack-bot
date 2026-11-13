// Apply the library release rules and changelog format.
const config = {
  "branches": [
    "main"
  ],
  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "conventionalcommits",
        "releaseRules": [
          {
            "scope": "no-release",
            "release": false
          },
          {
            "breaking": true,
            "release": "major"
          },
          {
            "revert": true,
            "release": "patch"
          },
          {
            "type": "feat",
            "release": "minor"
          },
          {
            "type": "fix",
            "release": "patch"
          },
          {
            "type": "perf",
            "release": "patch"
          },
          {
            "type": "chore",
            "release": "patch"
          },
          {
            "type": "docs",
            "release": "patch"
          },
          {
            "type": "style",
            "release": "patch"
          },
          {
            "type": "refactor",
            "release": "patch"
          },
          {
            "type": "test",
            "release": "patch"
          },
          {
            "type": "build",
            "release": "patch"
          },
          {
            "type": "ci",
            "release": "patch"
          },
          {
            "type": "*",
            "release": "patch"
          }
        ]
      }
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        "preset": "conventionalcommits",
        "presetConfig": {
          "types": [
            {
              "type": "feat",
              "section": "Features"
            },
            {
              "type": "fix",
              "section": "Bug Fixes"
            },
            {
              "type": "chore",
              "section": "Chores"
            },
            {
              "type": "docs",
              "section": "Documentation"
            },
            {
              "type": "style",
              "section": "Other"
            },
            {
              "type": "refactor",
              "section": "Code Refactoring"
            },
            {
              "type": "perf",
              "section": "Performance Improvements"
            },
            {
              "type": "test",
              "section": "Other"
            },
            {
              "type": "",
              "section": "Other"
            }
          ]
        },
        "linkReferences": false
      }
    ],
    [
      "@semantic-release/changelog",
      {
        "changelogTitle": "# Changelog\n\nSee\n[PR Guidelines](http://go/pr) for commit guidelines."
      }
    ],
    [
      "@semantic-release/npm",
      {}
    ],
    [
      "@semantic-release/github",
      {
        "assets": [],
        "failCommentCondition": false
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": [
          "CHANGELOG.md",
          "package.json",
          "yarn.lock",
          "pnpm-lock.yaml",
          "package-lock.json"
        ],
        "message": "chore(release): releases ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ],
  "repositoryUrl": `https://github.com/${process.env.GITHUB_REPOSITORY}.git`
};
if (!['true', 'false'].includes(process.env.LIBRARY_NPM_PUBLISH)) {
  throw new Error('npm-publish must be true or false');
}
config.plugins.find(([name]) => name === '@semantic-release/npm')[1].npmPublish = process.env.LIBRARY_NPM_PUBLISH === 'true';
if (process.env.SLACK_WEBHOOK) {
  config.plugins.push(['@timebyping/semantic-release-slack-bot', {
    notifyOnSuccess: true, slackChannel: 'release-notifications',
  }]);
}
// Resolve plugins from the isolated release install, including its preset dependency.
const { createRequire } = require('node:module');
const resolve = createRequire(process.env.RELEASE_TOOLS + '/package.json').resolve;
config.plugins = config.plugins.map(([plugin, options]) => [resolve(plugin), options]);
module.exports = config;
