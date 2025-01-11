import { ifError, rejects } from 'assert'
import nock from 'nock'
import postMessage from '../lib/postMessage.js'
import SemanticReleaseError from '@semantic-release/error'
import { describe, it, beforeEach } from 'mocha'

const slackWebhook = 'https://www.webhook.com'
const slackPostMessageDomain = 'https://slack.com'
const slackPostMessagePath = '/api/chat.postMessage'
const slackToken = 'token'
const slackChannel = 'channel'

async function postWebhook(url) {
  await postMessage('message', {}, { slackWebhook: url })
}

async function postToken(token, channel) {
  token = token || slackToken
  channel = channel || slackChannel
  await postMessage(
    { text: 'message' },
    { log: () => undefined },
    { slackToken: token, slackChannel: channel }
  )
}

describe('test postMessage with webhook', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  it('should pass if response is 200 "ok"', async () => {
    nock(slackWebhook)
      .post('/')
      .reply(200, 'ok')
    ifError(await postWebhook(slackWebhook))
  })

  it('should fail if response text is not "ok"', async () => {
    const response = ''
    nock(slackWebhook)
      .post('/')
      .reply(200, response)
    await rejects(
      postWebhook(slackWebhook),
      new SemanticReleaseError(response, 'INVALID SLACK COMMAND')
    )
  })

  it('should fail if response status code is not 200', async () => {
    const response = ''
    nock(slackWebhook)
      .post('/')
      .reply(500, response)
    await rejects(
      postWebhook(slackWebhook),
      new SemanticReleaseError(response, 'INVALID SLACK COMMAND')
    )
  })

  it('should fail if incorrect url', async () => {
    const incorrectUrl = 'https://sekhfskdfdjksfkjdhfsd.com'
    await rejects(postWebhook(incorrectUrl), {
      name: 'SemanticReleaseError',
      code: 'SLACK CONNECTION FAILED',
      details: undefined,
      message: 'fetch failed',
      semanticRelease: true
    })
  })
})

describe('test postMessage with token/channel', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  it('should pass if response is 200 "ok"', async () => {
    nock(slackPostMessageDomain)
      .post(slackPostMessagePath)
      .reply(200, JSON.stringify({ ok: true }))
    ifError(await postToken())
  })

  it('should fail if response text is not "ok"', async () => {
    const response = '{"ok":false,"error":"invalid_auth"}'
    nock(slackPostMessageDomain)
      .post(slackPostMessagePath)
      .reply(200, response)
    await rejects(
      postToken(),
      new SemanticReleaseError(response, 'INVALID SLACK COMMAND')
    )
  })

  it('should fail if response status code is not 200', async () => {
    const response = '{"ok":false,"error":"invalid_auth"}'
    nock(slackPostMessageDomain)
      .post(slackPostMessagePath)
      .reply(500, response)
    await rejects(
      postToken(),
      new SemanticReleaseError(response, 'INVALID SLACK COMMAND')
    )
  })
})
