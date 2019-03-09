const firebase = require("firebase");
require("firebase/firestore");

const DOC_PREFIX = "chat_";

class DB {
    constructor() {
        firebase.initializeApp({
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT
        });

        this.db = firebase.firestore();
        this.users = this.db.collection("user");
    }

    async resolveUser(accountNumber, { chatId, location, wakeTime }) {
        const user = await this.getUser(accountNumber);

        if (user.exists) {
            const userData = user.data();

            chatid = userData.chatId || chatId;
            location = userData.location || location || null;
            wakeTime = userData.wakeTime || wakeTime || null;
        }

        await this.users.doc(DOC_PREFIX + accountNumber).set({
            chatId: chatId || accountNumber,
            location: location || null,
            wakeTime: wakeTime || null
        });

        return { chatId, location, wakeTime };
    }

    async getUser(accountNumber) {
        return this.users.doc(DOC_PREFIX + accountNumber).get();
    }

    async getAllUsers() {
        
    }

    closeConnection() {
        firebase.database().goOffline();
    }
}

module.exports = DB;