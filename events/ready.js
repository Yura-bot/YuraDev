module.exports = (client) => {
    console.log("» "+client.user.username+" est prêt, connécté en tant que "+client.user.tag+".");

    /*
    client.channels.cache.get('720613525659058209').messages.fetch('784082628700667934').then(message => {
        if(!message.reactions.cache.has('🎟')) { message.react('🎟'); }
    })
    

    const Discord = require("discord.js");

    let embed = new Discord.MessageEmbed()
    .setTitle(`Système de Ticket`)
    .setColor("#36393f")
    .setDescription(`Réagissez avec 🎟️ pour créer un ticket.`);
    client.channels.cache.get('784091179377360967').send(embed).then(m => {
      m.react('🎟');
    });
    */
}