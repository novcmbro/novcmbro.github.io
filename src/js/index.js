import { initTranslation } from "./translation.js"
import navigateToSection from "./navigateToSection.js"
import setAge from "./setAge.js"

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("js-enabled")
  initTranslation()

  if (window.location.pathname === "/") {
    navigateToSection()
    setAge()
  }
})
