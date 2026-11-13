import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import config from './release.config.cjs';

export async function runRelease(semanticRelease) {
  if (!semanticRelease) {
    const require = createRequire(`${process.env.RELEASE_TOOLS}/package.json`);
    semanticRelease = (await import(pathToFileURL(require.resolve('semantic-release')))).default;
  }
  // API options take precedence over a caller's leftover release configuration.
  return semanticRelease({ ...config, ci: true });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await runRelease();
}
