const TelegramBot = require('./bot/TelegramBot');
const SmogApi = require('./apis/Smogger');
const DB = require('./db');

require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
const smogger = new SmogApi();

const myPos = {
  lat: 50.083967,
  long: 19.899659
};

var option = {
  "parse_mode": "Markdown",
  "reply_markup": {
      "one_time_keyboard": true,
      "keyboard": [[{
          text: "My phone number",
          request_contact: true
      }], ["Cancel"]]
  }
};


bot.addListener(() => true, (chatId, message) => {
  debugger;
  new Promise((res) => {
    res(smogger.getSmogReportForMyCoordinates(myPos));
	}).then(res => {
    debugger;
    bot.send(chatId, JSON.stringify(res), option)
  });
});
