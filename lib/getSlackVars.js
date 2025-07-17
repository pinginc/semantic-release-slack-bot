/**
 * Copyright © Time By Ping, Inc. 2025. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.'s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.
 */
export default (config) => {
  const {
    slackWebhookEnVar = 'SLACK_WEBHOOK',
    slackWebhook = process.env[slackWebhookEnVar],
    slackTokenEnVar = 'SLACK_TOKEN',
    slackToken = process.env[slackTokenEnVar],
    slackChannelEnVar = 'SLACK_CHANNEL',
    slackChannel = process.env[slackChannelEnVar],
    slackIconEnVar = 'SLACK_ICON',
    slackIcon = process.env[slackIconEnVar],
    slackNameEnVar = 'SLACK_NAME',
    slackName = process.env[slackNameEnVar],
  } = config;
  return {
    slackChannel,
    slackChannelEnVar,
    slackIcon,
    slackIconEnVar,
    slackName,
    slackNameEnVar,
    slackToken,
    slackTokenEnVar,
    slackWebhook,
    slackWebhookEnVar,
  };
};
