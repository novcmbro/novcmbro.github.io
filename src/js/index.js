import { changeLanguage, initTranslation } from "./translation.js"
import navigateToSection from "./navigateToSection.js"
import setAge from "./setAge.js"

document.addEventListener("DOMContentLoaded", () => {
  initTranslation()
  navigateToSection()
  setAge()

  const navLanguageButton = document.querySelector("#nav-language-button")
  navLanguageButton.addEventListener("click", changeLanguage)
})
