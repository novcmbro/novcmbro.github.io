const navigateToSection = () => {
  const sections = [...document.querySelectorAll("section")]

  const toggleAnimationClass = (section, updateAnimation) => {
    updateAnimation && section.classList.add("animation")

    setTimeout(() => {
      section.classList.remove("animation")
      !section.classList.length && section.removeAttribute("class")
    }, 1000)
  }
  
  const updateNavLinks = (currentSection) => {
    const navPreviousLink = document.querySelector("#nav-previous-link")
    const navNextLink = document.querySelector("#nav-next-link")

    const currentSectionIndex = sections.indexOf(currentSection)
    const prevSectionIndex = currentSectionIndex === 0 ? sections.length - 1 : currentSectionIndex - 1
    const nextSectionIndex = currentSectionIndex === sections.length - 1 ? 0 : currentSectionIndex + 1

    navPreviousLink.href = `#${sections[prevSectionIndex].id}`
    navNextLink.href = `#${sections[nextSectionIndex].id}`
    toggleAnimationClass(sections[currentSectionIndex], true)
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      entry.isIntersecting && updateNavLinks(entry.target)
    }
  }, { threshold: 0.5 })
  
  for (const section of sections) {
    observer.observe(section)
    toggleAnimationClass(section)
  }
}

export default navigateToSection
