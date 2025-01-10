import { deepStrictEqual, strictEqual } from 'assert'
import proxyquire from 'proxyquire'
import { stub } from 'sinon'
import { getBaseConfig, getContext } from './testUtils.js'

process.env.SLACK_WEBHOOK = 'awebhook'

let postMessageStub
let success

describe('test success', () => {
  beforeEach(() => {
    postMessageStub = stub()
    success = proxyquire('../lib/success', {
      './postMessage': postMessageStub
    })
  })

  it('should handle defaults', async () => {
    const packageName = 'Internal Test'
    const expectedKeys = ['blocks', 'text', 'attachments']

    await success(getBaseConfig(packageName), getContext())

    const result = postMessageStub.getCall(0).args[0]
    deepStrictEqual(Object.keys(result), expectedKeys)
    strictEqual(
      result.text,
      `A new version of ${packageName} has been released!`
    )
  })

  it('should handle onSuccessTemplate', async () => {
    const packageName = 'Internal Test'
    const text = 'Released!'
    const expectedResult = { text }
    const pluginConfig = getBaseConfig(packageName)

    pluginConfig.onSuccessTemplate = expectedResult

    await success(pluginConfig, getContext())

    const actualResult = postMessageStub.getCall(0).args[0]
    deepStrictEqual(actualResult, expectedResult)
  })

  it('should handle onSuccessFunction', async () => {
    const packageName = 'Internal Test'
    const text = 'Released!'
    const expectedResult = { text }
    const pluginConfig = getBaseConfig(packageName)
    const onSuccessFunction = (pluginConfig, context) => {
      return expectedResult
    }

    pluginConfig.onSuccessFunction = onSuccessFunction

    await success(pluginConfig, getContext())

    const actualResult = postMessageStub.getCall(0).args[0]
    deepStrictEqual(actualResult, expectedResult)
  })
})
