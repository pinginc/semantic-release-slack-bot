# Changelog

See
[PR Guidelines](http://go/pr) for commit guidelines.

## [1.1.5](https://github.com/pinginc/semantic-release-slack-bot/compare/v1.1.4...v1.1.5) (2025-02-27)

### Other

* **deps:** yarn upgrade f2c5c0e

## [1.1.4](https://github.com/pinginc/semantic-release-slack-bot/compare/v1.1.3...v1.1.4) (2025-01-21)

### Bug Fixes

* OWL-2934: carve out response case from slack ([#7](https://github.com/pinginc/semantic-release-slack-bot/issues/7)) 4c4782d

## [1.1.3](https://github.com/pinginc/semantic-release-slack-bot/compare/v1.1.2...v1.1.3) (2025-01-13)

### Other

* update readme ([#6](https://github.com/pinginc/semantic-release-slack-bot/issues/6)) dd3404e

## [1.1.2](https://github.com/pinginc/semantic-release-slack-bot/compare/v1.1.1...v1.1.2) (2025-01-11)

### Other

* redeploy 26f2a9e

## [1.1.1](https://github.com/pinginc/semantic-release-slack-bot/compare/v1.1.0...v1.1.1) (2025-01-11)

### Bug Fixes

* incorrect tests and messaging 4e20d70
* invalid imports 27da330

### Other

* manual bump 8ec9e06
* remove deps 6713f1e
* simplify slack 01d7a5d

## [1.1.0](https://github.com/pinginc/semantic-release-slack-bot/compare/v1.0.0...v1.1.0) (2025-01-11)

### Features

* OWL-2911: Upgrade All Packages ([#5](https://github.com/pinginc/semantic-release-slack-bot/issues/5)) d38b4eb

## 1.0.0 (2025-01-10)

### ⚠ BREAKING CHANGES

* **core:** We only support v18+ of Node and v20+ of semantic-release now. semantic-release library introduced a new version v20 which introduces several breaking changes, including but not limited Node v18 as requirement. More information can be found [here](https://github.com/semantic-release/semantic-release/releases/tag/v20.0.0).
* Drops support for Node 10. semantic-release-slack-bot supports Node 14+ from this version.
* Drops support for Node 8. semantic-release-slack-bot supports Node 10+ from this version.

### Features

* add maxLength option ([#27](https://github.com/pinginc/semantic-release-slack-bot/issues/27)) e4000b2, closes #26
* add onFail and onSuccess template options c075e91
* add option to specify slack app name ([#83](https://github.com/pinginc/semantic-release-slack-bot/issues/83)) 89ee876
* add option to specify slack icon ([#80](https://github.com/pinginc/semantic-release-slack-bot/issues/80)) 47952b0
* Add packageName as a config option ([#34](https://github.com/pinginc/semantic-release-slack-bot/issues/34)) bf323ca
* Add possibility to provide onSuccess function ([#53](https://github.com/pinginc/semantic-release-slack-bot/issues/53)) 1cb7fab
* add slackWebhook as configuration option ([#17](https://github.com/pinginc/semantic-release-slack-bot/issues/17)) d3df2b4, closes #16
* add support for token/channel option ([#79](https://github.com/pinginc/semantic-release-slack-bot/issues/79)) aa1eef6, closes #73
* Added a new message form that is published upon a build failure. 6f4afc6
* Added a nicer looking web page. 96b73ad
* Added integration with slack d541e59
* Added option to disable notifications 1117583
* allow to have a custom configuration per branches ([#63](https://github.com/pinginc/semantic-release-slack-bot/issues/63)) cab5394
* allow to override slack channel when using webhook ([#81](https://github.com/pinginc/semantic-release-slack-bot/issues/81)) 83b4699
* allows a custom environment variable name for Slack webhook ([#36](https://github.com/pinginc/semantic-release-slack-bot/issues/36)) a8bec27
* **core:** upgrade semantic-release to version v20 ([#104](https://github.com/pinginc/semantic-release-slack-bot/issues/104)) 54ee3bd, closes #103
* Empty commit to trigger major release 526e3ef
* **Error message:** Improve error message with a good description a5f7a7b
* Finalized notification messages b8ade21
* implement automatic conversion of Release Notes from Markdown to Slack Markdown f7b1955
* Include package name in notification 20e7a62
* **Logger:** Added logger c22afba
* Made button icon better aligned 3b1e420
* Made index page nice f424e7f
* Nicer error message 2e4a1c2
* Nicer slack message 8ef7a68
* **Notifications:** Added text for notification 1084b5e
* OWL-2911: fork project ([#3](https://github.com/pinginc/semantic-release-slack-bot/issues/3)) faee31d
* **templating:** Merged changes with new templating system and updated some details 90d01b6, closes #2
* update semantic release version ([#85](https://github.com/pinginc/semantic-release-slack-bot/issues/85)) 4a31a5f

### Bug Fixes

* add keyword (but actually force ci to publish) 07b918d
* add protocol to url starting with git@ ([#31](https://github.com/pinginc/semantic-release-slack-bot/issues/31)) 8baf727
* Added a favicon 8c806ea
* Added immediate logging of api exceptions 5679b4e, closes #19
* Added verifyCondition hook to check for the correct environment variable aa82207, closes #1
* adjust ci f12f7e9
* Avoid truncating in the middle of markdown ([#20](https://github.com/pinginc/semantic-release-slack-bot/issues/20)) bc373f9
* bump peer dependency ([#38](https://github.com/pinginc/semantic-release-slack-bot/issues/38)) 6103a60
* bumps semantic-release requirement to <19 ([#77](https://github.com/pinginc/semantic-release-slack-bot/issues/77)) 8d844ec
* **ci:** Added checkout to deploy 8b7ffd6
* **ci:** Restored cached filed before deploying e106418
* **ci:** test2 f9df42f
* **ci:** Tried fixing a ci config bug 5c1aea9
* **dependencies:** Added missing dependency 93b12f4
* Fix dependencies 7956978
* Fixed how messages are truncated acec2b5, closes #19
* Fixed spelling of JSON fb558a1
* **getrepoinfo:** fix for other TLD checking in repo url ([#33](https://github.com/pinginc/semantic-release-slack-bot/issues/33)) 22d83db
* make ci work 818fe92
* minor refactor d3e66f2
* npm audit fix 3f1956e
* **package.json:** Made project public 4430fae
* remove hashtag from version number ([#94](https://github.com/pinginc/semantic-release-slack-bot/issues/94)) 7795cda, closes #93
* rename wrongly named file 7383085
* repo_url typo e30d3a1
* simplify code and add tests ([#22](https://github.com/pinginc/semantic-release-slack-bot/issues/22)) cff4304
* slack token missing bearer prefix ([#84](https://github.com/pinginc/semantic-release-slack-bot/issues/84)) 1d410f7
* slackToken based message returns a JSON object ([#89](https://github.com/pinginc/semantic-release-slack-bot/issues/89)) e85e59c
* **success:** Fixed linting error in success 4e7c7ed
* support more vendors ([#25](https://github.com/pinginc/semantic-release-slack-bot/issues/25)) c0c378a
* **template:** fix replacement of a multiple occurence of the same variable ([#46](https://github.com/pinginc/semantic-release-slack-bot/issues/46)) 73c2238
* **test:** test1 02af17f
* Truncate release notes on "onSuccessTemplate" ([#23](https://github.com/pinginc/semantic-release-slack-bot/issues/23)) ad3b0af, closes #21
* truncated release notes > 3000 chars b5a861c
* Update creation of tag link in default success template ([#90](https://github.com/pinginc/semantic-release-slack-bot/issues/90)) 9f4c735, closes #82
* update peer dependency to allow future semantic release versions ([#108](https://github.com/pinginc/semantic-release-slack-bot/issues/108)) 4a89801
* updated green color 7b63086
* upgrade micromatch ([#123](https://github.com/pinginc/semantic-release-slack-bot/issues/123)) 34e721a
* use package_name on fail message ([#109](https://github.com/pinginc/semantic-release-slack-bot/issues/109)) 214aef0
* Used the linter c4c0f3d
* **verify-conditions:** Added check for non existant package name dc5f1c1, closes #4

### Other

* Add possibility to turn off truncation ([#52](https://github.com/pinginc/semantic-release-slack-bot/issues/52)) 32cf994
* Add screenshot e785e3a
* add semantic release 8c20cb5
* Add slack badge 4726b05
* Added a lint stage to the ci 57bf855
* Added colaborator to license 30f6fd5
* Added lambda and redirect page d1089d2
* Added printers with all valid properties b925a19
* Added security related instructions 297f9ca
* Added stuff a7eea92
* Added two better screenshots 9e6208c
* append Template to options 899ba64
* Bump dependencies ([#55](https://github.com/pinginc/semantic-release-slack-bot/issues/55)) 3c499f3
* bump slackify-markdown ([#69](https://github.com/pinginc/semantic-release-slack-bot/issues/69)) c8cb52b
* Create PRIVACY.md d47e989
* feat(ci): aa6a5f5
* Finalized truncation of too long messages 53b563f
* fix circleci badge link d32447b
* fixed old title dc897d9
* Fixes nicer indentation in code snippets 1b0af6a
* github_path > repo_path + added repo_url 907d2d8
* Initial commit 390f1bb
* Makes code in Readme.md nicer 8e55982
* Merge branch 'AndrewLeedham-master' 329c85a
* Merge branch 'master' of github.com:juliuscc/semantic-release-slack-bot ce4c896
* Merge pull request [#11](https://github.com/pinginc/semantic-release-slack-bot/issues/11) from juliuscc/dependabot/npm_and_yarn/lodash.template-4.5.0 83cb943
* Merge pull request [#5](https://github.com/pinginc/semantic-release-slack-bot/issues/5) from thopaw/fix-message-length 3c5a70d
* Merge remote-tracking branch 'origin/master' 9f415b3
* **naming:** Rename test files ([#54](https://github.com/pinginc/semantic-release-slack-bot/issues/54)) be18847
* npm init 2b6c206
* **prettier:** changes tab indentation to 2 space indentation ([#32](https://github.com/pinginc/semantic-release-slack-bot/issues/32)) f1aa538
* **Readme.md:** First draft of readme 49ec79d
* **readme:** add templating options 7efa3e2
* **Readme:** Added build status shield 8f3ba60
* **Readme:** Minor update on readme to make more idiomatic 5d330dc
* **Reamde:** Made docs look nicer cb4e01f
* refactored lambda script 9947f86
* Removed comments 2612c08
* Removed comments 9c98379
* Removed trash 4ed30aa
* Removed unnecessary log line. 37e0df5, closes #43
* Rename wiki/index.html to docs/index.html 14db594
* **slackChannel:**  missing # in slackChannel ([#100](https://github.com/pinginc/semantic-release-slack-bot/issues/100)) e7d1c4d
* test a6d9916
* Update README.md 41a32e1
* Update README.md 63582af
* Upload screenshot 6946c87
* Uppdated deployment URL 3ffea71
