const { red } = require('ansi-styles');
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.once('ready', () => {
	console.log('Ready!');
});

client.login(process.env.TOKEN);


client.on('message', message => {
    
    if(!message.author.bot) {
        if(message.content.toLowerCase().includes('!lockdown')) {
            message.reply('you are on lockdown')
            
            const shamedAuthor = message.member.user.id;

            let isUserShamed = true;

            client.setTimeout( () => {
                message.guild.roles.cache.find
                console.log('timeout complete');
                message.reply('no longer shamed, rejoins society');
                isUserShamed = false;
            }, 10000);
            
            client.on('message', message => {
                if(!message.author.bot && isUserShamed) {
                    if (message.mentions.users.has(shamedAuthor)) { 
                        message.reply('Sorry, this user is being shamed currently. Try again later')
                    }
                }
            })

        }
                
    
    }
})

