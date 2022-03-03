/** @type {import('next').NextConfig} */
module.exports = {
  // 重写打包后的文件名
  distDir: 'build',
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  }
}
