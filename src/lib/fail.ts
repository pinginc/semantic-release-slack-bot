/* Copyright © Time By Ping, Inc. 2024. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.’s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.*/
const getConfigToUse = require('./getConfigToUse');
const postMessage = require('./postMessage');
const template = require('./template');
const getSlackVars = require('./getSlackVars');

module.exports = async (pluginConfig, context) => {
  const {
    logger,
    options,
    errors,
    env: { SEMANTIC_RELEASE_PACKAGE, npm_package_name },
  } = context;

  const configToUse = getConfigToUse(pluginConfig, context);
  const { packageName } = configToUse;
  const { slackWebhook, slackToken, slackChannel, slackIcon, slackName } = getSlackVars(configToUse);

  const package_name = SEMANTIC_RELEASE_PACKAGE || packageName || npm_package_name;

  if (!configToUse.notifyOnFail) {
    logger.log('Notifying on fail skipped');
    return;
  }

  logger.log('Sending slack notification on fail');

  let slackMessage = {};
  const repoPath =
    options.repositoryUrl.indexOf('git@github.com') !== -1
      ? options.repositoryUrl.split(':')[1].replace('.git', '')
      : undefined;
  const repoURL = repoPath && `https://github.com/${repoPath}`;

  // Override default fail message
  if (configToUse.onFailFunction) {
    slackMessage = configToUse.onFailFunction(configToUse, context);
  } else if (configToUse.onFailTemplate) {
    slackMessage = template(configToUse.onFailTemplate, {
      package_name,
      repo_path: repoPath,
      repo_url: repoURL,
    });
  } else {
    const plural = errors.length > 1;

    const messageSummaryLine = `${
      plural ? 'Errors' : 'An error'
    } occurred while trying to publish the new version of \`${package_name}\`!`;

    const divider = {
      type: 'divider',
    };

    const messageBlocks = [
      {
        text: {
          text: messageSummaryLine,
          type: 'mrkdwn',
        },
        type: 'section',
      },
    ];

    if (repoPath) {
      const metadata = {
        elements: [
          {
            text: `*<${repoURL}|${repoPath}>*`,
            type: 'mrkdwn',
          },
        ],
        type: 'context',
      };

      messageBlocks.push(metadata);
    }

    const attachments = [
      {
        text: {
          text: `:no_entry:  *${plural ? 'Exceptions' : 'Exception'}*`,
          type: 'mrkdwn',
        },
        type: 'section',
      },
    ];

    for (const error of errors) {
      if (attachments.length > 2) {
        attachments.push(divider);
      }
      attachments.push({
        text: {
          text: `\`\`\`${error.stack}\`\`\``,
          type: 'mrkdwn',
        },
        type: 'section',
      });
    }

    slackMessage = {
      attachments: [
        {
          blocks: attachments,
          color: '#ff0000',
        },
      ],
      blocks: messageBlocks,
      text: `${plural ? 'Errors' : 'An error'} occurred while trying to publish the new version of ${package_name}!`,
    };
  }

  await postMessage(slackMessage, logger, {
    slackChannel,
    slackIcon,
    slackName,
    slackToken,
    slackWebhook,
  });
};
