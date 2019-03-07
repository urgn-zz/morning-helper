const firebase = require("firebase");
require("firebase/firestore");

class DB {
    constructor() {
        console.log(process.env.FIREBASE_API_KEY);

        firebase.initializeApp({
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT
        });

        this.db = firebase.firestore();
        this.users = this.db.collection("user");
    }

    async resolveUser(accountNumber, chatId, location, wakeTime) {
        const user = await this.users.get(accountNumber);

        if (user.exists) {
            const userData = user.data();

            chatid = userData.chatId || chatId;
            location = userData.location || location;
            wakeTime = userData.wakeTime || wakeTime;
        }

        await this.users.doc(accountNumber).set({
            chatId,
            location,
            wakeTime
        });

        return { chatId, location, wakeTime };
    }

    closeConnection() {
        firebase.database().goOffline();
    }
}

module.exports = DB;