const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  latex: true
})

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isUserOrOrgPages = !!repo && repo.endsWith('.github.io')
const basePath = isGithubActions && repo && !isUserOrOrgPages ? `/${repo}` : ''

module.exports = withNextra({
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true
  }
})
