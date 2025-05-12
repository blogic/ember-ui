#!/usr/bin/env node
import { execa } from 'execa';

import { writeFile } from 'node:fs/promises';

const { stdout } = await execa`pnpm formatjs extract ./app/**/*.hbs`;

const extractedJSON = JSON.parse(stdout);

const output = {};

for (let key in extractedJSON) {
  output[key] = extractedJSON[key].defaultMessage;
}

await writeFile('./translations/en-us.json', JSON.stringify(output, null, 2));
