/**
 * Copyright © Time By Ping, Inc. 2025. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.'s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.
 */
import { URL } from 'url';

export default (repositoryUrl) => {
  if (repositoryUrl.startsWith('git@')) {
    repositoryUrl = 'ssh://' + repositoryUrl;
  }
  const parsedUrl = new URL(
    // without these replacements we will get a TypeError [ERR_INVALID_URL]
    repositoryUrl.replace(/\.([a-z])*:/i, (rep) => rep.substring(0, rep.length - 1) + '/')
  );
  const path = parsedUrl.pathname
    .substring(1) // remove leading "/"
    .replace('.git', '') // remove .git
    .replace(':', ''); // remove any colons from path (present in github for example)
  const { hostname } = parsedUrl;
  const url = `https://${parsedUrl.host}/${path}`;
  return { hostname, path, URL: url };
};
