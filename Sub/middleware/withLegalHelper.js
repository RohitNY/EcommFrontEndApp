export default function () {
  if (window && window.Spectrum) {
    const mailId = window.Spectrum.BootstrapUri.split('/')[0]

    const insertStaticLegalText = (placeholder) => {
      const opsInjectedLegalText = document.getElementById('PchLegalStaticDisclosure')
      if (opsInjectedLegalText) {
        placeholder.innerHTML = opsInjectedLegalText.innerHTML
      }
    }

    const applyMailIdToLegalLinks = () => {
      const officialRules = document.getElementById('PchLegalOfficialRules')
      const sweepstakesFacts = document.getElementById('PchLegalSweepstakesFacts')
      ;[officialRules, sweepstakesFacts]
        .filter(el => el !== null)
        .forEach(elm => (elm.href = elm.href.replace('%mailid%', mailId)))
    }

    const setStaticLegalText = setInterval(() => {
      /* footer has rendered when this elm is found */
      const placeholder = document.getElementById('PchLegalStaticDisclosurePlaceholder')
      if (placeholder) {
        insertStaticLegalText(placeholder)
        applyMailIdToLegalLinks()
        clearInterval(setStaticLegalText)
      }
    }, 999)
  }
}
