import SemanticReleaseError from '@semantic-release/error'

export default async function postMessage(
  message,
  logger,
  { slackWebhook, slackToken, slackChannel, slackIcon, slackName }
) {
  let response
  let body
  let isSuccess
  try {
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
    const request = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: slackToken ? `Bearer ${slackToken}` : undefined,
      },
      body: JSON.stringify(message)
    }

    response = await fetch(webhook, request)
    const bodyText = await response.text()
    body = JSON.parse(bodyText)
    isSuccess = response.ok && body['ok']
  } catch (e) {
    throw new SemanticReleaseError(e.message, 'SLACK CONNECTION FAILED')
  }

  if (!isSuccess) {
    logger.log('JSON message format invalid: ' + JSON.stringify(body))
    throw new SemanticReleaseError(JSON.stringify(body), 'INVALID SLACK COMMAND')
  }
}
