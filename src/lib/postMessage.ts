/* Copyright © Time By Ping, Inc. 2024. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.’s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.*/
const fetch = require('node-fetch');
const SemanticReleaseError = require('@semantic-release/error');

module.exports = async (message, logger, { slackWebhook, slackToken, slackChannel, slackIcon, slackName }) => {
  let response;
  let bodyText;
  let isSuccess;
  try {
    if (slackIcon) {
      const hasSemicolons = slackIcon.startsWith(':') && slackIcon.endsWith(':');
      message['icon_emoji'] = hasSemicolons ? slackIcon : `:${slackIcon}:`;
    }

    if (slackName) {
      message.username = slackName;
    }

    if (slackToken && slackChannel) {
      message.channel = slackChannel;
      response = await fetch('https://slack.com/api/chat.postMessage', {
        body: JSON.stringify(message),
        headers: {
          Authorization: `Bearer ${slackToken}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        method: 'post',
      });
      bodyText = await response.text();
      isSuccess = response.ok && JSON.parse(bodyText).ok;
    } else {
      if (slackChannel) {
        message.channel = slackChannel;
      }
      response = await fetch(slackWebhook, {
        body: JSON.stringify(message),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
      });
      bodyText = await response.text();
      isSuccess = response.ok && bodyText === 'ok';
    }
  } catch (e) {
    throw new SemanticReleaseError(e.message, 'SLACK CONNECTION FAILED');
  }

  if (!isSuccess) {
    logger.log('JSON message format invalid: ' + bodyText);
    throw new SemanticReleaseError(bodyText, 'INVALID SLACK COMMAND');
  }
};
