module.exports = async(client, reaction, user) => {
    if(user.bot) return;
    const guild = reaction.message.guild;

    if (reaction.message.channel.id === "665844000812564496") {
  
        if (reaction.emoji.name === "🔔") {
          reaction.message.guild.members.cache.get(user.id).roles.add("723828253432741955") // Notif role.
          return user.send("Vous avez désormais le role **🔔• Notifications** !").catch(() => console.log("Failed to send DM."));
        }
    
        if (reaction.emoji.name === "🔁") {
          await reaction.message.guild.members.cache.get(user.id).roles.add("727508132699570249") // Changelog role.
          return user.send("Vous avez désormais le role **🔁• Changelog** !").catch(() => console.log("Failed to send DM."));
        }
    
        if (reaction.emoji.name === "🎈") {
          reaction.message.guild.members.cache.get(user.id).roles.add("733230417129242695") // Status role.
          return user.send("Vous avez désormais le role **🎈• Status** !").catch(() => console.log("Failed to send DM."));
        }
        
        if (reaction.emoji.name === "💼") {
          await reaction.message.guild.members.cache.get(user.id).roles.add("727508164056055901"); // Partenaires role.
          return user.send("Vous avez désormais le role **💼 • Partenaires** !").catch(() => console.log("Failed to send DM."));
        }
    
    }

    let categorieId = "784090744704204800"
    let channelId = "784091179377360967"
    let messageId = "784094233715539968"
    let logId = "784094796687343636"
    let staffId = "784089712788635670"

    if(user.bot) return;

    switch (reaction.message.channel.id) {
        case channelId:
            if(reaction.message.id !== messageId) return;
            if(reaction.emoji.name !== '🎟') return;

            reaction.message.reactions.resolve('🎟').users.remove(user.id).then();
            if(client.channels.cache.find(c => c.name === 'demande-'+user.id)) return;
            if(client.tickets.has(user)) return;

            client.tickets.set(user, 'creating');
            user.send({
                embed: {
                    title: ":question: Voulez-vous vraiment continuez ?",
                    description: "Afin de continuer l'ouverture de votre demande auprès de l'assistance,\n" +
                        "répondez par `oui` ou par `non`, vous pouvez toujours annuler.",
                    url: client.url,
                    color: client.color,
                    timestamp: new Date(),
                    footer: {
                        text: client.footer,
                        icon_url: client.user.displayAvatarURL({format: 'png'})
                    }
                }
            })
            .catch(e => {
              return client.channels.cache.get('784091179377360967').send(`<:X_:673212163837526064>, **${user.username}** Vous devez activer vos messages privés.`).then(msg => msg.delete({timeout: 7000}))
            })
            .then(msg => {
                msg.channel.awaitMessages(m => m.author.id === user.id, {
                    max: 1
                }).catch(e => {}).then(collected => {
                    if (collected.first().content !== 'oui') {
                        user.send({
                            embed: {
                                title: "Aurevoir " + user.username + " !",
                                description: client.getEmoji(client.config.emojis.no) + " Vous venez d'annuler l'ouverture de votre demande auprès de notre assistance.",
                                url: client.url,
                                color: client.color,
                                timestamp: new Date(),
                                footer: {
                                    text: client.footer,
                                    icon_url: client.user.displayAvatarURL({format: 'png'})
                                }
                            }
                        })
                        client.tickets.delete(user);
                    } else {
                        user.send({
                            embed: {
                                title: ":smile: Parfait, continuons alors !",
                                description: ":pushpin: **»** Expliquer en détails le sujet de votre demande.\n" +
                                    ":link: **»** À savoir, toutes les images uploadées dans votre message ne sont\n" +
                                    " pas prises en compte, merci d'intégrer des liens d'images hébergés sur des\n" +
                                    " plateformes en lignes, ou d'envoyer vos images après l'ouverture de la demande.",
                                url: client.url,
                                color: client.color,
                                timestamp: new Date(),
                                footer: {
                                    text: client.footer,
                                    icon_url: client.user.displayAvatarURL({format: 'png'})
                                }
                            }
                        }).then(msg => {
                            msg.channel.awaitMessages(m => m.author.id === user.id, {
                                max: 1
                            }).then(collected => {
                                guild.channels.create("demande-" + user.id, {
                                    parent: categorieId,
                                    permissionOverwrites: [
                                        {
                                            id: guild.id,
                                            deny: ["VIEW_CHANNEL"]
                                        },
                                        {
                                            id: staffId, 
                                            allow: ["VIEW_CHANNEL"]
                                        },
                                        {
                                            id: user.id,
                                            allow: ["VIEW_CHANNEL"]
                                        }
                                    ]
                                }).then(ticketChannel => {
                                    client.tickets.delete(user);
                                    let ticketName = user.id;

                                    user.send({
                                        embed: {
                                            title: ":postal_horn: Et voilà !",
                                            description: client.getEmoji(client.config.emojis.yes)+" Nous venons d'ouvrir votre demande auprès de l'assistance.\n" +
                                                "**»** "+ticketChannel.toString(),
                                            url: client.url,
                                            color: client.color,
                                            timestamp: new Date(),
                                            footer: {
                                                text: client.footer,
                                                icon_url: client.user.displayAvatarURL({format: 'png'})
                                            }
                                        }
                                    })

                                    client.channels.cache.get(logId).send({
                                        embed: {
                                            description: ":unlock: **»** **"+user.tag+"** vient d'ouvrir une demande.",
                                            color: '2ECC71'
                                        }
                                    })

                                    ticketChannel.send({
                                        embed: {
                                            title: "Demande #" + ticketName,
                                            description: "Bonjour **" + user.username + "**, \n" +
                                                "Votre demande est désormais ouvert sous le nom **" + ticketName + "**.",
                                            thumbnail: {
                                                url: user.displayAvatarURL({format: 'png', dynamic: true})
                                            },
                                            fields: [
                                                {
                                                    name: "Informations sur l'utilisateur",
                                                    value: user.username + " - `" + user.tag + "`"
                                                },
                                                {
                                                    name: "Sujet de la demande",
                                                    value: "```" + collected.first().content + "```"
                                                },
                                                {
                                                    name: "À savoir",
                                                    value: ":pushpin: Vous ne devez pas **mentionner** le staff sous peine de sanctions.\n" +
                                                        "Votre demande sera traitée le plus rapidemenet possible.\n" +
                                                        "Pour fermer votre demande réagissez '🔒' à ce message."
                                                }
                                            ],
                                            url: client.url,
                                            color: client.color,
                                            timestamp: new Date(),
                                            footer: {
                                                text: client.footer,
                                                icon_url: client.user.displayAvatarURL({format: 'png'})
                                            }
                                        }
                                    }).then(ticketEmbedMessage => {
                                        ticketEmbedMessage.react('🔒');
                                    })
                                })
                            })
                        })
                    }
                })
            })
            break;
    }

    if(reaction.message.channel.parentID === categorieId) {
        if(reaction.emoji.name !== '🔒') return;
        if(!reaction.message.author.bot) return;
        if(!reaction.message.embeds[0].title.startsWith("Demande")) return;

        let ticket = reaction.message.embeds[0];
        reaction.message.reactions.resolve('🔒').users.remove(user.id)
        Promise.all([
            reaction.message.react(client.config.emojis.yes),
            reaction.message.react(client.config.emojis.no)
        ])

        reaction.message.awaitReactions((r, u) => u.id === user.id && (r.emoji.id === client.config.emojis.yes || r.emoji.id === client.config.emojis.no), {
            max: 1
        }).then(collected => {
            if(collected.first().emoji.id !== client.config.emojis.yes) {
                Promise.all([
                    reaction.message.reactions.resolve(client.config.emojis.no).remove(),
                    reaction.message.reactions.resolve(client.config.emojis.yes).remove()
                ])
            } else {
                let ticketName = ticket.title.substr(9);
                reaction.message.channel.delete().then(() => {
                    user.send({
                        embed: {
                            title: ":postal_horn: Et voilà !",
                            description: ":lock: Vous venez de fermer la demande de **"+client.users.cache.get(ticketName).tag+"**.",
                            url: client.url,
                            color: client.color,
                            timestamp: new Date(),
                            footer: {
                                text: client.footer,
                                icon_url: client.user.displayAvatarURL({format: 'png'})
                            }
                        }
                    })

                    client.channels.cache.get(logId).send({
                        embed: {
                            description: ":lock: **»** **"+user.tag+"** vient de fermer la demande de **"+client.users.cache.get(ticketName).tag+"**.",
                            color: 'E74C3C'
                        }
                    })
                });
            }
        })
    }
}