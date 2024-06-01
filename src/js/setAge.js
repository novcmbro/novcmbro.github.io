const setAge = () => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const noBirthdayYet = currentDate.getTime() < new Date(currentYear, 11, 17).getTime()
  
  let age = currentYear - 1996
  noBirthdayYet && age--
  
  const ageElement = document.querySelector("#age")
  ageElement.textContent = age
}

export default setAge
