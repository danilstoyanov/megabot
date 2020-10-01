const callTelegramApi = require('./callTelegramApi')

async function sendMessage(chat_id, text) {
  await callTelegramApi('sendMessage', { chat_id, text })
}

module.exports = sendMessage