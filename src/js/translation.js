import enUS from "../locales/en-us.js"
import ptBR from "../locales/pt-br.js"

const languages = { en: enUS, pt: ptBR }
const localStorageKey = "novcmbro_portfolio_language"
const languageElement = document.querySelector("#current-language")

export const initTranslation = () => {
  const navigatorLanguage = navigator.language.split("-")[0].toLowerCase()
  const navigatorOrFallbackLanguage = (navigatorLanguage === "en" || navigatorLanguage === "pt") ? navigatorLanguage : "en"
  const language = localStorage.getItem(localStorageKey)
  const elements = document.querySelectorAll("[data-translation]")
  
  if (!language) {
    localStorage.setItem(localStorageKey, navigatorOrFallbackLanguage)
    window.location.href = "/"
  }
  
  document.documentElement.lang = language
  document.querySelector("meta[http-equiv='Content-Language']").content = language
  languageElement.textContent = language === "en" ? "pt" : "en"
  
  for (const element of elements) {
    const id = element.dataset.translation
    const separator = { nesting: ".", word: "_" }
    const hasId = !!id.trim()
    const hasInvalidId = hasId && !id.match(`^[a-z${separator.nesting}${separator.word}]+$`)

    if (hasId && !hasInvalidId) {
      const nestedId = id.split(separator.nesting)
      let text = languages[language]
      
      for (let i = 0; i < nestedId.length; i++) {
        const key = nestedId[i]
        text = text && text[key]
      }
      
      element.ariaLive = "polite"
      element.textContent = text
    }
  }
}

export const changeLanguage = () => {
  localStorage.setItem(localStorageKey, languageElement.textContent)
  initTranslation()
}
