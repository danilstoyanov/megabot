const fetch = require('node-fetch')
const querystring = require('query-string')

const TELEGRAM_TOKEN = '1387017819:AAGpyLmdyH9deHaq3DC7NMrRclHm8UovCU0'

async function callTelegramApi(method = '', params = {}, config = {}) {
  const encodedParams = querystring.stringify(params)

  try {
    const request = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/${method}?${encodedParams}`, config)
    const data = await request.json()

    console.log(data, 'data')

    return data
  } catch (err) {
    console.log(err, 'Request error happened')
  }
}

module.exports = callTelegramApi