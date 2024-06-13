import enUS from "../locales/en-us.js"
import ptBR from "../locales/pt-br.js"

const languages = { en: enUS, pt: ptBR }
const localStorageKey = "novcmbro_portfolio_language"
const separator = { nesting: ".", word: "_" }
const language = () => localStorage.getItem(localStorageKey)
const languageElement = document.querySelector("#current-language")

const translation = (key) => {
  const nestedId = key.split(separator.nesting)
  let text = languages[language()]

  for (let i = 0; i < nestedId.length; i++) {
    const key = nestedId[i]
    text = text && text[key]
  }

  return text
}

const translateElements = () => {
  document.querySelectorAll("[name='title']").forEach(title => {
    const titleText = `Novcmbro | ${translation("title")}`
    title.content && (title.content = titleText)
    title.textContent && (title.textContent = titleText)
  })
  document.querySelectorAll("meta[name='description']").forEach(description => description.content = translation("description"))
  document.querySelector("meta[name='keywords']").content = translation("keywords")
}

const changeLanguage = () => {
  localStorage.setItem(localStorageKey, languageElement.textContent)
  initTranslation()
  translateElements()

  const languageAlert = document.querySelector("#nav-language-alert")
  languageAlert.setAttribute("aria-hidden", false)
}

export const initTranslation = () => {
  const navigatorLanguage = navigator.language.split("-")[0].toLowerCase()
  const navigatorOrFallbackLanguage = (navigatorLanguage === "en" || navigatorLanguage === "pt") ? navigatorLanguage : "en"
  const elements = document.querySelectorAll("[data-translation]")
  
  if (!language()) {
    localStorage.setItem(localStorageKey, navigatorOrFallbackLanguage)
    window.location.href = "/"
  }
  
  document.documentElement.lang = language()
  document.querySelector("meta[http-equiv='Content-Language']").content = language()
  languageElement.textContent = language() === "en" ? "pt" : "en"
  
  for (const element of elements) {
    const id = element.dataset.translation
    const hasId = id.trim()
    const hasInvalidId = hasId && !id.match(`^[a-z${separator.nesting}${separator.word}]+$`)

    if (hasId && !hasInvalidId) {
      element.textContent = translation(id)
    }
  }

  translateElements()

  const navLanguageButton = document.querySelector("#nav-language-button")
  navLanguageButton.addEventListener("click", changeLanguage)
}
