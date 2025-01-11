import { ifError, rejects } from 'assert'
import nock from 'nock'
import postMessage from '../lib/postMessage.js'
import SemanticReleaseError from '@semantic-release/error'
import { describe, it, beforeEach } from 'mocha'

const slackWebhook = 'https://smee.io/gDess2cGoeAXqqJa'
const slackPostMessageDomain = new URL(slackWebhook).origin
const slackPostMessagePath = new URL(slackWebhook).pathname
const slackToken = 'token'
const slackChannel = 'channel'

async function postToken(token, channel) {
  await postMessage(
    'message',
    { log: console.log },
    { slackWebhook, slackToken: token, slackChannel: channel }
  )
}

describe('test postMessage with token/channel', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  it('should pass if response is 200 "ok"', async () => {
    nock(slackPostMessageDomain)
      .post(slackPostMessagePath)
      .reply(200, JSON.stringify({ ok: true }))
    ifError(await postToken(slackToken, slackChannel))
  })

  it('should fail if response text is not "ok"', async () => {
    const response = '{"ok":false,"error":"invalid_auth"}'
    nock(slackPostMessageDomain)
      .post(slackPostMessagePath)
      .reply(200, response)
    await rejects(
      postToken(slackToken, slackChannel),
      new SemanticReleaseError(response, 'INVALID SLACK COMMAND')
    )
  })

  it('should fail if response status code is not 200', async () => {
    const response = '{"ok":false,"error":"invalid_auth"}'
    nock(slackPostMessageDomain)
      .post(slackPostMessagePath)
      .reply(500, response)
    await rejects(
      postToken(slackToken, slackChannel),
      new SemanticReleaseError(response, 'INVALID SLACK COMMAND')
    )
  })
})
