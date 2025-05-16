#!/usr/bin/env node
import { execa } from 'execa';
import { writeFile } from 'node:fs/promises';

let [,,dir] = process.argv;
dir = dir ?? './translations';

const { stdout } = await execa`npx formatjs extract ./app/**/*.(hbs|js)`;

const extractedJSON = JSON.parse(stdout);

const output = {};

for (let key in extractedJSON) {
  output[key] = extractedJSON[key].defaultMessage;
}

await writeFile(`${dir}/en-us.json`, JSON.stringify(output, null, 2));
