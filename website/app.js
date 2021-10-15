/* Global Variables */
  const apiKey = '5b8af0e7b31155bf7ea66f6337471862'

// Create a new date instance dynamically with JS
let d = new Date()
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear()

// Event listener to add function to existing HTML DOM element
const generate = document.getElementById('generate')
generate.addEventListener('click', updateUI)
async function updateUI(){
  try {
    const temp = await getData(apiKey)
    await saveProjectData(newDate, temp)
    const finalData = await getProjectData()
    document.getElementById('date').innerHTML = `the date is ${finalData.date}`
    document.getElementById(
      'temp',
    ).innerHTML = `temprature is ${finalData.temp}`
    document.getElementById(
      'content',
    ).innerHTML = `your feeling is ${finalData.content}`
  } catch (error) {
    console.log('ERROR', error)
  }
}

/* Function called by event listener */
async function getData(apiKey) {
  const zipCode = document.getElementById('zip').value
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`
  const response = await fetch(url)
  const newData = await response.json()
  let temp = await newData.main.temp
  return temp
}

/* Function to POST data */
async function saveProjectData(newDate, temp) {
  const content = document.getElementById('feelings').value
  await fetch('/saveProjectData', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      date: newDate,
      temp: await temp,
      content: content,
    }),
  })
}

/* Function to GET Project Data */
async function getProjectData() {
  const finalResponse = await fetch('/getProjectData')
  const finalData = await finalResponse.json()
  return finalData
}
