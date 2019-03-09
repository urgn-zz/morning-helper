const TelegramBot = require('node-telegram-bot-api');

class Bot {
  
  constructor(token) {
    this.bot = new TelegramBot(token, {polling: true});
    this.listeners = [];
    this.initListeners();
  }

  initListeners() {
    this.bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      this.listeners.forEach((listener) => {
        if (listener.accept(msg)) {
          listener.react(chatId, msg);
        }
      });
    });
  };

  addListener(accept, react) {
    this.listeners.push({accept, react});
  }

  get send() {
    return this.bot.sendMessage.bind(this.bot);
  }
}

module.exports = Bot;