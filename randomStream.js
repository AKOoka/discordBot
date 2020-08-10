const https = require('https')

const willBeStream = {
  name: 'stream',
  description: 'asks bot if there will be stream or not',
  execute () {
    https.get('https://yesno.wtf/api', (resp) => {
      let data = ''

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk
      })

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        const { answer, image } = JSON.parse(data)
        return { answer, image }
      })
    }).on('error', (err) => {
      console.log('Error: ' + err.message)
    })
  }
}

module.exports = { willBeStream }
