const fs = require('fs')
const FormData = require('form-data')
const callTelegramApi = require('./callTelegramApi')

async function sendAudio(chat_id, songPath = 'song.mp3') {
  const requestFormData = new FormData()

  requestFormData.append('chat_id', chat_id)
  requestFormData.append('audio', fs.createReadStream(songPath))

  const requestConfig = {
    method: 'POST',
    body: requestFormData
  }

  await callTelegramApi('sendAudio', {}, requestConfig)
}

module.exports = sendAudio