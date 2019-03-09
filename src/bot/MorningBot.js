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
 
    async locationReply(chatId, location) {
        const oldRecord = await this.db.getUser(chatId);
        let oldLocation = null;
        
        if (oldRecord.exists) {
            oldLocation = oldRecord.location;
        }

        await this.db.resolveUser(chatId, { location });

        let answer;

        if (oldLocation) {
            answer = "Location is changed";
        } else {
            answer = "Location is set";
        }

        return { text: [answer, FOOTER].join('/n') }
    }

    timeReply(chatId, timeParam) {
        //
    }

    async infoReply(chatId) {
        const user = await this.db.getUser(chatId);

        if (!user.exists) {
            return { text: [ "User data was not set", FOOTER ].join("\n") }
        }

        const userData = user.data();

        const result = [];

        if (userData.location) {
            result.push("Report for location " + JSON.stringify(userData.location));

            const smogData = await this.smog.getSmogReportForMyCoordinates(userData.location);
            const weatherData = await this.weather.getCurrentWeatherOnLocation(userData.location);

            result.push(JSON.stringify(smogData));
            result.push(JSON.stringify(weatherData));
        } else {
            result.push("Location not set");
        }

        result.push("Aweake time: " + (userData.wakeTime || "notSet"));

        return {
            text: result.join("\n")
        };
    }

    standardReply(content) {
        return content;
    }

}

module.exports = MorningBot;
