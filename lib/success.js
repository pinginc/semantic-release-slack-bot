/**
 * Copyright © Time By Ping, Inc. 2025. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.'s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.
 */
import slackifyMarkdown from 'slackify-markdown';

import getConfigToUse from './getConfigToUse.js';
import getRepoInfo from './getRepoInfo.js';
import getSlackVars from './getSlackVars.js';
import postMessage from './postMessage.js';
import template from './template.js';
import truncate from './truncate.js';

// 2900 is the limit for a message block of type 'section'.
const MAX_LENGTH = 2900;

export default async (pluginConfig, context) => {
  const {
    logger,
    nextRelease,
    options,
    env: { SEMANTIC_RELEASE_PACKAGE, npm_package_name },
  } = context;

  const configToUse = getConfigToUse(pluginConfig, context);
  const { unsafeMaxLength = MAX_LENGTH, packageName } = configToUse;
  const { slackWebhook, slackToken, slackChannel, slackIcon, slackName } = getSlackVars(configToUse);

  const package_name = SEMANTIC_RELEASE_PACKAGE || packageName || npm_package_name;

  if (!configToUse.notifyOnSuccess) {
    logger.log('Notifying on success skipped');
    return;
  }

  logger.log('Sending slack notification on success');

  const repo = getRepoInfo(options.repositoryUrl);

  let releaseNotes = nextRelease.notes;

  if (configToUse.markdownReleaseNotes) {
    // Creating slack format from the markdown notes.
    releaseNotes = slackifyMarkdown(releaseNotes);
  }

  // truncate long messages
  if (unsafeMaxLength > 0) {
    releaseNotes = truncate(releaseNotes, unsafeMaxLength);
  }

  let slackMessage = {};
  // Override default success message
  if (configToUse.onSuccessFunction) {
    slackMessage = configToUse.onSuccessFunction(configToUse, context);
  } else if (configToUse.onSuccessTemplate) {
    slackMessage = template(configToUse.onSuccessTemplate, {
      npm_package_version: nextRelease.version,
      package_name,
      release_notes: releaseNotes,
      repo_path: repo.path,
      repo_url: repo.URL,
    });
  } else {
    const messageBlocks = [
      {
        text: {
          text: `A new version of \`${package_name}\` has been released!\nCurrent version is *${nextRelease.version}*`,
          type: 'mrkdwn',
        },
        type: 'section',
      },
    ];

    if (releaseNotes !== '') {
      messageBlocks.push({
        text: {
          text: `${releaseNotes}`,
          type: 'mrkdwn',
        },
        type: 'section',
      });
    }

    slackMessage = {
      blocks: messageBlocks,
      text: `A new version of ${package_name} has been released!`,
    };

    if (repo.path) {
      const { gitTag } = nextRelease;
      const gitTagPrefix = repo.hostname.startsWith('gitlab') ? '/-/releases/' : '/releases/tag/';
      const gitTagUrl = repo.URL + gitTagPrefix + gitTag;

      slackMessage.attachments = [
        {
          blocks: [
            {
              elements: [
                {
                  text: `:package: *<${repo.URL}|${repo.path}>:*   <${gitTagUrl}|${gitTag}>`,
                  type: 'mrkdwn',
                },
              ],
              type: 'context',
            },
          ],
          color: '#2cbe4e',
        },
      ];
    }
  }

  await postMessage(slackMessage, logger, {
    slackChannel,
    slackIcon,
    slackName,
    slackToken,
    slackWebhook,
  });
};
