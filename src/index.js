const P = require('bluebird');
const T = require ('node-telegram-bot-api');

const TelegramBot = require('./lib/TelegramBot');
const DB = require('./lib/FirebaseDB');
const SmogApi = require('./apis/Smogger');
const WeatherApi = require('./apis/Weather');
const MorningBot = require('./bot/MorningBot');

require('dotenv').config();

const db = new DB();
const telegram = new TelegramBot(process.env.TELEGRAM_TOKEN);
const smog = new SmogApi();
const weather = new WeatherApi(process.env.WEATHER_API_KEY);
const morningBot = new MorningBot(db, smog, weather);

const COMMAND_PARSER = /^\/([a-z0-9_])+(\@[a-z]\w*(_\w+)*)?([ \f\n\r\t\v\u00A0\u2028\u2029].*)?$/ig;

telegram.addListener(() => true, async (chatId, message) => {
  let result = morningBot.standardReply();

  if (message.text) {
    const command = message.text.match(COMMAND_PARSER); 
    
    switch (command[0]) {
      case '/start':
        result = morningBot.launchReply(chatId);
        break;
      case '/time':
        result = morningBot.timeReplay(chatId, message.text);
        break;
      case '/location':
        result = morningBot.locationRequest(chatId);
        break;
      case '/info':
        result = await morningBot.infoReply(chatId)
        break;
    }
  } else if (message.location) {
    result = await morningBot.locationReply(chatId, message.location);
  }

  telegram.send(chatId, result.text, result.options);
});
