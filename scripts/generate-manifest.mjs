// This script generates a manifest file for Storybook React Native projects.
// The manifest file contains metadata about the stories in your project, which
// Chromatic can use to navigate and capture your stories.
//
// https://gist.github.com/jmhobbs/4ebf0fb9bf961e1a5df68cb7fea48bc5
//
//
// Usage: generate-manifest [options]
//
// Options:
//   -c, --config <path>  Path to Storybook config (default: "./.rnstorybook")
//   -o, --output <path>  Output directory (will be created if needed) (default: "./storybook-static/")
//   -h, --help           display help for command
//
import { program } from 'commander';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';

async function buildIndex(configPath) {
  try {
    // Storybook 10+

    const { buildIndex } = await import('@storybook/react-native/node');
    return buildIndex({ configPath });
  } catch (err) {
    // Storybook 9
    const { createRequire } = await import('module');
    const require = createRequire(import.meta.url);

    const { buildIndex } = await require('storybook/internal/core-server');
    return buildIndex({ configDir: configPath });
  }
}

program
  .option('-c, --config <path>', 'Path to Storybook config', './.rnstorybook')
  .option(
    '-o, --output <path>',
    'Output directory (will be created if needed)',
    './storybook-static/',
  );

program.parse();

const options = program.opts();

console.log('Loading Storybook index.');
const index = await buildIndex(options.config);
const entries = Object.values(index.entries).filter(
  (entry) => entry.type === 'story',
);

console.log('Building story manifest.');
const stories = [];
entries.forEach((entry) => {
  stories.push({
    storyId: entry.id,
    name: entry.name,
    fileName: entry.importPath,
    component: {
      name: entry.title,
      csfId: entry.id.replace(/--.+$/, ''),
      displayName: entry.title.split('/').slice(-1)[0],
      path: entry.title.split('/'),
    },
  });
});
console.log(`Found ${stories.length} stories.`);

const outputFile = resolve(options.output, 'manifest.json');
console.log(`Writing manifest to file at "${outputFile}"`);
mkdirSync(options.output, { recursive: true });
writeFileSync(outputFile, JSON.stringify({ stories, json: entries }, null, 2));
console.log('Manifest generation complete!');
