import fs from 'node:fs';

const files = ['src/index.js', 'src/math.js', 'test/math.test.mjs'];
const errors = [];

for (const rel of files) {
  const content = fs.readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8');

  if (content.includes('\t')) {
    errors.push(`${rel}: contains tab characters`);
  }

  if (!content.endsWith('\n')) {
    errors.push(`${rel}: missing trailing newline`);
  }
}

if (errors.length > 0) {
  console.error('Lint failed:');
  for (const err of errors) console.error(`- ${err}`);
  process.exit(1);
}

console.log('Lint passed');
