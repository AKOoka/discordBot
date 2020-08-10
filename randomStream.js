const fetch = require('node-fetch')
const fs = require('fs')

const willBeStream = {
  name: 'stream',
  description: 'asks bot if there will be stream or not',
  execute () {
    return checkTime()
  }
}

async function checkTime () {
  const fileData = fs.readFileSync('streamToday.json')
  const { date, answer, image } = JSON.parse(fileData)
  const currenDate = new Date().getDate()

  if (date !== currenDate) {
    const jsonData = await fetch('https://yesno.wtf/api')
    const data = await jsonData.json()
    const saveData = {
      date: currenDate,
      answer: data.answer,
      image: data.image
    }

    fs.writeFileSync('streamToday.json', JSON.stringify(saveData))

    return { answer: data.answer, image: data.image }
  }

  return { answer, image }
}

module.exports = { willBeStream }
