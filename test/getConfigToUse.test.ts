/* Copyright © Time By Ping, Inc. 2024. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.’s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.*/
const assert = require('assert');
const getConfigToUse = require('../lib/getConfigToUse');
const { getContext } = require('./testUtils');

describe('test getConfigToUse', () => {
  it('should return the global config when no branchesConfig', () => {
    const context = getContext();
    const pluginConfig = {
      notifyOnFail: true,
      notifyOnSuccess: false,
    };
    const expectedConfig = pluginConfig;

    const actual = getConfigToUse(pluginConfig, context);
    assert.deepEqual(actual, expectedConfig);
  });

  it('should return the branch config merged with the global config when branchesConfig match the branch', () => {
    const context = getContext('lts/1.x');

    const pluginConfig = {
      branchesConfig: [
        {
          notifyOnFail: true,
          notifyOnSuccess: false,
          pattern: 'lts/*',
        },
      ],
      slackWebhook: 'http://slack-webhook',
    };
    const expectedConfig = {
      notifyOnFail: true,
      notifyOnSuccess: false,
      slackWebhook: 'http://slack-webhook',
    };

    const actual = getConfigToUse(pluginConfig, context);
    assert.deepEqual(actual, expectedConfig);
  });

  it('should return the global config when no branchesConfig match the branch name', () => {
    const context = getContext('beta');
    const pluginConfig = {
      branchesConfig: [
        {
          notifyOnFail: true,
          notifyOnSuccess: true,
          pattern: 'lts/*',
        },
      ],
      notifyOnFail: false,
      notifyOnSuccess: false,
    };

    const expectedConfig = {
      notifyOnFail: false,
      notifyOnSuccess: false,
    };

    const actual = getConfigToUse(pluginConfig, context);
    assert.deepEqual(actual, expectedConfig);
  });
});
