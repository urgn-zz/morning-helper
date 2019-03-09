const HEADER = `Hello I'm morning bot`;
const FOOTER = `You can update your /location waking /time`;

const CONFIG_KEYBOARD = {
    "parse_mode": "Markdown",
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [[{
            text: "Current location",
            request_location: true
          }],
          ["Cancel"]]
      }
    };

class MorningBot {

    constructor(db, smog, weather) {
        this.db = db;
        this.smog = smog;
        this.weather = weather;
    }

    launchReply() {
        return {
            text: [HEADER, FOOTER].join('\n'),
            options: CONFIG_KEYBOARD
        };
    }

    locationRequest() {

    }
 
    locationReply(chatId, location) {
        //
    }

    timeReplay(chatId, timeParam) {
        //
    }

    infoReply(chatId) {
        //
    }

    standardReply(content) {
        return content;
    }

}

module.exports = MorningBot;
