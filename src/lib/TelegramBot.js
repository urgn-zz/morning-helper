const TelegramBot = require('node-telegram-bot-api');

class Bot {
  
  constructor(token) {
    this.bot = new TelegramBot(token, {polling: true});
    this.listeners = [];
    this.initListeners();
  }

  initListeners() {
    this.bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      for (let i = 0; i < this.listeners.length; i++) {
        const listener = this.listeners[i];
        
        if (listener.accept(msg)) {
          await listener.react(chatId, msg);
        }
      }
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
