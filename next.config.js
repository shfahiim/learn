const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  latex: true
})

module.exports = withNextra({
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/foundations/:path*', destination: '/probability/foundations/:path*', permanent: false },
      { source: '/discrete/:path*', destination: '/probability/discrete/:path*', permanent: false },
      { source: '/continuous/:path*', destination: '/probability/continuous/:path*', permanent: false },
      { source: '/advanced/:path*', destination: '/probability/advanced/:path*', permanent: false },
      { source: '/god-tier/:path*', destination: '/probability/god-tier/:path*', permanent: false },
    ]
  }
})
