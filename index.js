//var config = require('./config.js');
try {
    var config = process.cwd() + '/config.js';
    config = require(config);
} catch (error) {
    console.error('ERROR -> Unable to load config file.');
    process.exit(1);
}

const Discord = require('discord.js');
const bot = new Discord.Client();

//Make sure the bot comes online
bot.on('ready', () => {
    console.log('The started and is online!');
})

bot.on('message', message => {

    let args = message.content.substring(config.bot.commandPrefix.length).split(" ");
    switch (args[0]) {
        case 'tr':
            message.channel.sendMessage('works');
            break;
        case 'clear':
            if (!args[1]) return message.reply('Error please enter how many message to delete')
            message.channel.bulkDelete(args[1]);
            break;
    }
})

bot.login(config.bot.botToken);