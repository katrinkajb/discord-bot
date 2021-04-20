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

console.log(topOfRolesList);
    if(!message.author.bot) 
    console.log(message.guild.roles.cache)
// creates a role just below the powerbot permission. ALways has to be one step lower than the bot permission. Will need to set up bot permission in initial setup
    message.guild.roles.create({ 
        data: {
            name: 'temporary role',
            // set properties here
            position: topOfRolesList,
            // Must be decimal
            color: 6030083,
            permissions: []
        }
    });


// will have to find the new role's id in order to delete the right now

    client.setTimeout( () => {
        message.guild.roles.cache.find(role => role.id === '834199832242552854').delete();
        console.log('timeout complete')
        }, 5000);
    


})
