/**
 * Copyright © Time By Ping, Inc. 2025. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.'s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.
 */
export default (messageText, maxLength) => {
  if (messageText.length <= maxLength) return messageText;

  const delimiter = '\n';
  // split the truncated message into the
  // first element and an array with the rest
  const [firstLine, ...restLines] = messageText.substring(0, maxLength).split(delimiter);
  // if the array restLines is not empty, remove the last element
  const truncatedLines = [firstLine, ...restLines.slice(0, -1)];

  return `${truncatedLines.join(delimiter)}*[...]*`;
};
