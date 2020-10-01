const fetch = require('node-fetch')
const querystring = require('query-string')

const TELEGRAM_TOKEN = 'INSERT_YOUR_TOKEN_HERE'

async function callTelegramApi(method = '', params = {}) {
  const encodedParams = querystring.stringify(params)

  try {
    const request = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/${method}?${encodedParams}`)
    const data = await request.json()

    return data
  } catch (err) {
    console.log(err, 'Request error happened')
  }
}

module.exports = callTelegramApi