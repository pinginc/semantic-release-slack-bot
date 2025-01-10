/* Copyright © Time By Ping, Inc. 2024. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.’s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.*/
function template(input, variables) {
  switch (typeof input) {
    case 'string':
      return Object.keys(variables).reduce(
        (output, variable) => (variables[variable] ? output.split(`$${variable}`).join(variables[variable]) : output),
        input
      );
    case 'object':
      if (Array.isArray(input)) {
        return input.map((value) => template(value, variables));
      } else {
        return Object.entries(input).reduce(
          (out, [key, value]) => ({
            ...out,
            [key]: template(value, variables),
          }),
          {}
        );
      }
    default:
      return input;
  }
}

module.exports = template;
