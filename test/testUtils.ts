/* Copyright © Time By Ping, Inc. 2024. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.’s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.*/
const getBaseConfig = (packageName) => ({
  markdownReleaseNotes: true,
  notifyOnFail: true,
  notifyOnSuccess: true,
  packageName,
});

const getContext = (branchName = 'master') => {
  const version = '1.0.0';
  return {
    branch: {
      name: branchName,
    },
    env: {
      npm_package_name: 'internal test',
    },
    errors: ['Something went horribly wrong'],
    logger: console,
    nextRelease: {
      gitTag: `v${version}`,
      notes: 'hello',
      version,
    },
    options: {
      repositoryUrl: 'git+https://github.com/juliuscc/semantic-release-slack-bot.git',
    },
  };
};

module.exports = {
  getBaseConfig,
  getContext,
};
