const { red } = require('ansi-styles');
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.once('ready', () => {
	console.log('Ready!');
});

client.login(process.env.TOKEN);


client.on('message', message => {
    const rolesCount = message.guild.roles.cache.size;
    
    const topOfRolesList = rolesCount - 1;

    if(!message.author.bot) {

        let newRoleId = '';    

        message.guild.roles.create({ 
            data: {
                name: 'SHAME ROLE',
                // creates a role just below the powerbot permission. Always has to be one step lower than the bot permission. Will need to set up bot permission in initial setup
                position: topOfRolesList,
                // Must be decimal
                color: 6030083,
                permissions: []
            }
        })
        // finds id of newly created role
        .then((result) => {
            newRoleId = result.id;
            message.member.roles.add(result);
            message.reply('SHAME ON YOU');
        })

        client.setTimeout( () => {
            message.guild.roles.cache.find(role => role.id === newRoleId).delete();
            console.log('timeout complete');
            message.reply('You have been released from your shame');
            }, 5000);
    }
})

// Won't work on server owner, need to figure out a different process for that case or owners only get light shame without losing any permissions
