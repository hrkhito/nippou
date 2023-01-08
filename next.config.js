/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

// const withInterceptStdout = require('next-intercept-stdout');

// const nextConfig = withInterceptStdout(
//   {
//     reactStrictMode: true,
//     swcMinify: false,
//     ignoreDuringBuilds: true,
//     staticPageGenerationTimeout: 1000
//   },
//   (text) => (text.includes('Duplicate atom key') ? '' : text),
// );

// module.exports = nextConfig

// // next.config.js
// const withInterceptStdout = require('next-intercept-stdout');
// const withSvgr = require('@newhighsco/next-plugin-svgr');

// module.exports = withInterceptStdout(
//   withSvgr({
//     reactStrictMode: true,
//     svgrOptions: {},
//   }),
//   (text) => (text.includes('Duplicate atom key') ? '' : text),
// );
