/**
 * Copyright © Time By Ping, Inc. 2025. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.'s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.
 */
import SemanticReleaseError from '@semantic-release/error';

import getSlackVars from './getSlackVars.js';

export default (pluginConfig, context) => {
  const { logger } = context;
  const { slackWebhook, slackWebhookEnVar, slackToken, slackChannel, slackChannelEnVar } = getSlackVars(pluginConfig);

  if (slackToken) {
    if (!slackChannel) {
      logger.log('SLACK_TOKEN must be used with SLACK_CHANNEL which has not been defined.');
      throw new SemanticReleaseError(
        'No Slack channel defined.',
        'ENOSLACKCHANNEL',
        `A Slack Channel must be created and set in the \`${slackChannelEnVar}\` environment variable on your CI environment.\n\n\nPlease make sure to set a Slack Channel in the \`${slackChannelEnVar}\` environment variable on your CI environment. Alternatively, provide \`slackChannel\` as a configuration option.`
      );
    }
  } else if (!slackWebhook) {
    logger.log('SLACK_WEBHOOK has not been defined.');
    throw new SemanticReleaseError(
      'No Slack web-hook defined.',
      'ENOSLACKHOOK',
      `A Slack Webhook must be created and set in the \`${slackWebhookEnVar}\` environment variable on your CI environment.\n\n\nPlease make sure to create a Slack Webhook and to set it in the \`${slackWebhookEnVar}\` environment variable on your CI environment. Alternatively, provide \`slackWebhook\` as a configuration option.`
    );
  }

  if (!context.env.npm_package_name && !pluginConfig.packageName && !context.env.SEMANTIC_RELEASE_PACKAGE) {
    logger.log('npm package name, config packageName and SEMANTIC_RELEASE_PACKAGE name are undefined');
    throw new SemanticReleaseError(
      'No name for the package defined.',
      'ENOPACKAGENAME',
      `A name for the package must be created. Run through npm (npm run <semantic-release-script> to use npm package name or define packageName in the plugin config or \`SEMANTIC_RELEASE_PACKAGE\` in the environment`
    );
  }

  if (pluginConfig.branchesConfig && !Array.isArray(pluginConfig.branchesConfig)) {
    logger.log('branchesConfig is defined and is not an array');
    throw new SemanticReleaseError(
      'branchesConfig is not an array.',
      'EINVALIDBRANCHCONFIG',
      `Provided branches configuration is not an array. Ensure "branchesConfig" is properly set in your configuration option.`
    );
  }

  if (pluginConfig.branchesConfig && pluginConfig.branchesConfig.some(({ pattern }) => !pattern)) {
    logger.log('pattern is not defined in branchesConfig');
    throw new SemanticReleaseError(
      'pattern is not defined in branchesConfig.',
      'ENOPATTERN',
      `A pattern for the branch configuration must be added. Ensure "branchesConfig" is properly set in your configuration option.`
    );
  }
};
