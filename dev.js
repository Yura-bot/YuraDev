const { Client, Collection } = require('discord.js');

const Config = require('./configs/config.json');
const Snippet = require('./configs/Snippet');
const Handler = require('./structure/Handler');

class Class extends Client {
    constructor() {
        super({ disableMentions: "everyone", partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

        this.prefix = Config.prefix;
        this.url = Config.url;
        this.color = Config.color;
        this.footer = Config.footer;

        try { this.launch().then(() => { console.log("• Lancement du robot réussi, connexion à Discord.."); }); }
        catch (e) { throw new Error(e); }

        this.login(Config.token).then(() => { console.log("• Connexion à Discord réussi !"); });
    }

    async launch() {
        this.config = Config;
        this.snippet = Snippet;

        this.tickets = new Collection();

        const handlers = new Handler(this);
        handlers.events();
    }

    getEmoji(emojiId) {
        return this.emojis.cache.get(emojiId).toString();
    }

}

module.exports = new Class();

