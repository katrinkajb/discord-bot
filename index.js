const { red } = require('ansi-styles');
const Discord = require('discord.js');
const { executionAsyncResource } = require('node:async_hooks');
const client = new Discord.Client();
require('dotenv').config();

client.once('ready', () => {
	console.log('Ready!');
});

client.login(process.env.TOKEN);

// 
client.on('message', async message => {
    if(!message.author.bot) {
        if(message.content.toLowerCase().includes('!!music')) {
    // go to youtube/some free place to start a collaborative playlist
            
// npm i ytdl - dependency needed to pull videos from youtube

    // need config?

            message.reply('starting concentration music')
            
            const serverQueue = queue.get(message.guild.id);

            if(message.content.startsWith(`!!play`)) {
                message.reply('playing song');
                // play song
                execute(message, serverQueue);
                // if a song is already playing, add new song to queue
            }

            else if(message.content.startsWith(`!!pause`)) {
                message.reply('pausing song');
                // pause song
                execute(message, serverQueue);
            }

            else if(message.content.startsWith(`!!skip`)) {
                message.reply('skipping song');
                // skip song
                execute(message, serverQueue);
            }

            else if(message.content.startsWith(`!!stop`)) {
                message.reply('stopping song');
                // stop song
                execute(message, serverQueue);
            } else {
                message.channel.send('Please enter a valid command')
            }

            const queue = new Map();

            async function execute(message, serverQueue) {
                const args = message.content.split(' ');

                const voiceChannel = message.member.voice.channel;

                if(!voiceChannel)
                    return message.channel.send(
                        'Please join a voice channel to make a music request'
                    );
                
                const permissions = voiceChannel.permissionsFor(message.client.user);

                if(!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
                    return message.channel.send(
                        'Please give me connect and join permissions in your voice channel'
                    );
                }
            }
            const songInfo = await ytdl.getInfo(args[1]);
            const song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
            };

            if (!serverQueue) {

            } else {
                serverQueue.songs.push(song);
                console.log(serverQueue.songs);
                return message.channel.send(`${song.title} has been added to the queue!`)
            }
       

            // Creating the contract for our queue
            const queueContruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true,
            };
            // Setting the queue using our contract
            queue.set(message.guild.id, queueContruct);
            // Pushing the song to our songs array
            queueContruct.songs.push(song);
            
            try {
                // Here we try to join the voicechat and save our connection into our object.
                var connection = await voiceChannel.join();
                queueContruct.connection = connection;
                // Calling the play function to start a song
                play(message.guild, queueContruct.songs[0]);
            } catch (err) {
                // Printing the error message if the bot fails to join the voicechat
                console.log(err);
                queue.delete(message.guild.id);
                return message.channel.send(err);
            }   
        }
    }
})

