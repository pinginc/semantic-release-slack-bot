/* Copyright © Time By Ping, Inc. 2024. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.’s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.*/
import { type Context } from 'semantic-release';
import micromatch from 'micromatch';

interface BranchConfig {
  pattern: string;
  [key: string]: any;
}

interface PluginConfig {
  branchesConfig?: BranchConfig[];
  [key: string]: any;
}

export default (pluginConfig: PluginConfig, context: Context): PluginConfig => {
  const {
    branch: { name },
  } = context;

  const { branchesConfig = [], ...globalPluginConfig } = pluginConfig;
  const { pattern, ...branchConfig } = branchesConfig.find(({ pattern }) => micromatch.isMatch(name, pattern)) || {};

  return { ...globalPluginConfig, ...branchConfig };
};
