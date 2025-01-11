import SemanticReleaseError from '@semantic-release/error'

export default async function postMessage(
  msg,
  logger,
  { slackWebhook, slackToken, slackChannel, slackIcon, slackName }
) {
  let response
  let body
  let isSuccess
  try {
    const message = {
      text: msg
    }
    if (slackIcon) {
      const hasSemicolons = slackIcon.startsWith(':') && slackIcon.endsWith(':')
      message['icon_emoji'] = hasSemicolons ? slackIcon : `:${slackIcon}:`
    }

    if (slackName) {
      message.username = slackName
    }

    if (slackChannel) {
      message.channel = slackChannel
    }

    const webhook = slackWebhook || 'https://slack.com/api/chat.postMessage'

    response = await fetch(webhook, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: slackToken ? `Bearer ${slackToken}` : undefined,
      },
      body: JSON.stringify(message)
    })
    body = await response.json()
    isSuccess = response.ok && body.ok
  } catch (e) {
    throw new SemanticReleaseError(e.message, 'SLACK CONNECTION FAILED')
  }

  if (!isSuccess) {
    logger.log('JSON message format invalid: ' + JSON.stringify(body))
    throw new SemanticReleaseError(JSON.stringify(body), 'INVALID SLACK COMMAND')
  }
}
