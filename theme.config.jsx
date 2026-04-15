export default {
  logo: (
    <div className="nx-flex nx-items-center nx-gap-4">
      <span className="nx-font-bold">Probability</span>
    </div>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Probability" />
      <meta
        property="og:description"
        content="An intuition-first, interactive guide to probability: foundations, distributions, inequalities, and limit theorems."
      />
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
  },
  gitTimestamp: null
}
