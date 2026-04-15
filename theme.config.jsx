export default {
  logo: <span>Probability Distributions Guide</span>,
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Probability Distributions Guide" />
      <meta property="og:description" content="Master Guide to Probability Distributions: From Beginner to Advanced" />
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Probability Guide'
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
  }
}