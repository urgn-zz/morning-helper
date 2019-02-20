const TelegramBot = require('./bot/TelegramBot');
const SmogApi = require('./apis/Smogger');

require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
const smogger = new SmogApi();
const myPos = {
  lat: 50.083967,
  long: 19.899659
}


bot.addListener(() => true, (chatId, message) => {
  
new Promise((res) => {
    res(smogger.getSmogReportForMyCoordinates(myPos));
	}).then(res => bot.send(chatId, JSON.stringify(res)));
});
