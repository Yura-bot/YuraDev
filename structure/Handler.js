const { readdirSync } = require('fs');
const { join } = require("path");

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    events() {
        let count = 0;
        const files = readdirSync(join(__dirname, "../events"));
        files.forEach((e) => {
            try {
                count++;
                const fileName = e.split('.')[0];
                const file = require(join(__dirname, "../events", e));
                this.client.on(fileName, file.bind(null, this.client));
                delete require.cache[require.resolve(join(__dirname, "../events", e))];
            } catch (error) {
                throw new Error(`${'[Events]'} Impossible de charger l'évenement ${e}: ${error.stack || error}.`)
            }
        });
        console.log(`${'[Events]'} Chargé(s): ${count}/${files.length} évenement(s).`)
    }
}