const fs = require('fs')
const process = require('process')
const express = require('express')
const app = express()
const port = 3000

const callTelegramApi = require('./callTelegramApi')
const sendMessage = require('./sendMessage')

let offset = Number(fs.readFileSync('./offset.txt', { encoding: 'utf-8' }))

const updateOffset = (value) => {
  fs.writeFileSync('./offset.txt', value)
}

function startPolling() {
  async function poll() {
    const request = await callTelegramApi('getUpdates', { offset })
    const lastUpdateId = request.result[request.result.length - 1].update_id

    if(lastUpdateId > offset) {
      offset = lastUpdateId

      updateOffset(offset)

      if(request.result[request.result.length - 1].message.text.includes('/музон')) {
        sendMessage(request.result[request.result.length - 1].message.chat.id, 'Я еще не умею :(')
      }
    }
  }

  setInterval(poll, 2000)
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  startPolling()
})

process.on('SIGINT', () => {
  console.log('Server terminated, writing offset.txt');

  updateOffset(offset);

  process.exit();
})