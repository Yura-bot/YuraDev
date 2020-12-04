module.exports = async(client, reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.guild.id !== "665843302767001620") return;
    
    if (reaction.message.channel.id === "665844000812564496") {
      if (reaction.emoji.name === "🔔") {
        await reaction.message.guild.members.cache.get(user.id).roles.remove("723828253432741955") // Notif role removed.
        return user.send("Vous n'avez désormais plus le role **🔔• Notifications** !").catch(() => console.log("Failed to send DM."));
      }
  
      if (reaction.emoji.name === "🔁") {
        await reaction.message.guild.members.cache.get(user.id).roles.remove("727508132699570249") // Changelog role removed.
        return user.send("Vous n'avez désormais plus le role **🔁• Changelog** !").catch(() => console.log("Failed to send DM."));
      }
  
      if (reaction.emoji.name === "🎈") {
        await reaction.message.guild.members.cache.get(user.id).roles.remove("733230417129242695") // Notif role removed.
        return user.send("Vous n'avez désormais plus le role **🎈• Status** !").catch(() => console.log("Failed to send DM."));
      }
      
      if (reaction.emoji.name === "💼") {
        await reaction.message.guild.members.cache.get(user.id).roles.remove("727508164056055901") // Partenaires role removed.
        return user.send("Vous n'avez désormais plus le role **💼 • Partenaires** !").catch(() => console.log("Failed to send DM."));
      }
    } else {
      return;
    }
  }