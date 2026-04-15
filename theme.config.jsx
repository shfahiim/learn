import { useRouter } from 'next/router'

const Logo = () => {
  const { asPath } = useRouter()
  let title = 'Home'
  if (asPath.startsWith('/probability')) {
    title = 'Probability'
  } else if (asPath.startsWith('/machine-learning')) {
    title = 'Machine Learning'
  }
  return (
    <div className="nx-flex nx-items-center nx-gap-4">
      <span className="nx-font-bold">{title}</span>
    </div>
  )
}

export default {
  logo: <Logo />,
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <meta property="og:title" content="Learn Interactive" />
      <meta
        property="og:description"
        content="An interactive learning platform for Probability and Machine Learning"
      />
    </>
  ),
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath === '/') {
      return {
        titleTemplate: 'Learn Interactive'
      }
    }
    return {
      titleTemplate: '%s – Learn Interactive'
    }
  },
  footer: {
    component: null
  },
  editLink: {
    component: null
  },
  feedback: {
    content: null
  },
  gitTimestamp: null,
  nextThemes: {
    defaultTheme: 'light'
  }
}
