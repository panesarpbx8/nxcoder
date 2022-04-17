const fs =  require('fs-extra');
const concat = require('concat');

async function build() {
  const files = [
    './dist/nxcoder/main.js',
    './dist/nxcoder/polyfills.js',
    './dist/nxcoder/runtime.js',
  ];

	const dir = '../public/assets/js';

	await fs.ensureDir(dir);
	await concat(files, `${dir}/elements.js`);

	console.log(`Elements output at ${dir}`);
}

build();