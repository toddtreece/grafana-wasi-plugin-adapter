import { componentize } from '@bytecodealliance/componentize-js';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const enableAot = process.env.ENABLE_AOT == '1'

const jsSource = await readFile('index.js', 'utf8');

const { component } = await componentize(jsSource, {
  witPath: resolve('../plugin.wit'),
  enableAot,
  disableFeatures: ['random', 'stdio', 'clocks', 'http'],
});

await writeFile('convert.component.wasm', component);