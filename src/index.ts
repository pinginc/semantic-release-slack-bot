/* Copyright © Time By Ping, Inc. 2024. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.’s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.*/
const verifyConditions = require('./lib/verifyConditions');
const success = require('./lib/success');
const fail = require('./lib/fail');

module.exports = {
  fail,
  success,
  verifyConditions,
};
