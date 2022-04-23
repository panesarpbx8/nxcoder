const fs =  require('fs-extra');
const concat = require('concat');

async function build() {
  const files = [
    './dist/main.js',
    './dist/polyfills.js',
    './dist/runtime.js',
  ];

	const dir = './public/assets/js';

	await fs.ensureDir(dir);
	await concat(files, `${dir}/elements.js`);

	console.log(`Elements output at ${dir}`);
}

build();