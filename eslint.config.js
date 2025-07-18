/* Copyright © Time By Ping, Inc. 2025. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.'s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.*/

import config from '@timebyping/eslint-config';

export default [
  ...config,
  {
    rules: {
      'camelcase': 'off', // JavaScript project uses snake_case for environment variables
      'no-param-reassign': 'off', // Common pattern in JavaScript libraries
      '@cspell/spellchecker': 'off', // Custom words in this project
    },
  },
];
