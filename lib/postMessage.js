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

export default async function postMessage(
  message,
  logger,
  { slackWebhook, slackToken, slackChannel, slackIcon, slackName }
) {
  let response;
  let body;
  let isSuccess;
  try {
    if (slackIcon) {
      const hasSemicolons = slackIcon.startsWith(':') && slackIcon.endsWith(':');
      message['icon_emoji'] = hasSemicolons ? slackIcon : `:${slackIcon}:`;
    }

    if (slackName) {
      message.username = slackName;
    }

    if (slackChannel) {
      message.channel = slackChannel;
    }

    const webhook = slackWebhook || 'https://slack.com/api/chat.postMessage';
    const request = {
      body: JSON.stringify(message),
      headers: {
        Accept: 'application/json',
        Authorization: slackToken ? `Bearer ${slackToken}` : undefined,
        'Content-Type': 'application/json; charset=utf-8',
      },
      method: 'post',
    };

    response = await fetch(webhook, request);
    const bodyText = await response.text();
    logger.log('received response: ' + bodyText);
    if (bodyText != 'ok') {
      body = JSON.parse(bodyText);
      isSuccess = response.ok && body['ok'];
    } else {
      isSuccess = true;
    }
  } catch (e) {
    throw new SemanticReleaseError(e.message, 'SLACK CONNECTION FAILED');
  }

  if (!isSuccess) {
    logger.log('JSON message format invalid: ' + JSON.stringify(body));
    throw new SemanticReleaseError(JSON.stringify(body), 'INVALID SLACK COMMAND');
  }
}
