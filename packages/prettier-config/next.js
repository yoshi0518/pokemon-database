const Common = require('./common');

/** @type {import('prettier').Config} */
module.exports = {
  ...Common,
  jsonRecursiveSort: true,
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-sort-json'],
};
