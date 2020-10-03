const fs = require('fs')
const process = require('process')
const express = require('express')
const app = express()
const port = 3000

// ЧИТАЕТ ТЕКУЩУЮ ДИРЕКТОРИЮ
let musicArray = fs.readdirSync('./music')

//get random song
function getRandomSong() {
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }
  let randomNumber = getRandomIntInclusive(0, musicArray.length - 1)
  return `./music/${musicArray[randomNumber]}`
}
//modules inport
const callTelegramApi = require('./callTelegramApi')
const sendMessage = require('./sendMessage')
const sendAudio = require('./sendAudio')

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
        sendMessage(request.result[request.result.length - 1].message.chat.id, 'Если вызвал меня, обязательно послушай песенку!:)')

        sendAudio(request.result[request.result.length - 1].message.chat.id, getRandomSong())
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