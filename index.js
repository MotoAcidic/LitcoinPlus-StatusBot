//var config = require('./config.js');
try {
    var config = process.cwd() + '/config.js';
    config = require(config);
} catch (error) {
    console.error('ERROR -> Unable to load config file.');
    process.exit(1);
}

var command = require("./functions/command.js");
var cron = require("./functions/cron.js");

const { Client } = require('discord.js');
const client = new Client();
global.globalClient = client;

client.on('ready', () => {
    log.log_write_console(config.messages.botStarted + ` ${client.user.tag}!`);
    client.user.setPresence({ status: 'online', game: { name: config.bot.gameMessage } }); 
},

client.on('message', msg => {
    var userID = msg.author.id;
    var userName = msg.author;
    var messageFull = msg;
    var messageType = msg.channel.type;
    var messageContent = msg.content;
    var channelID = msg.channel.id;
    var userBot = msg.author.bot;


    // Only check messages if its not the bot itself or another bot
    if (userID == config.bot.botID)
        return;

    // Only check if its not other bot
    if (userBot)
        return;

    // If its not a dm message check if its a valid channel for commands
    if (!check.check_respond_channel(channelID) && messageType !== 'dm')
        return;

    // If message has command prefix
    if (messageContent.startsWith(config.bot.commandPrefix)) {
        var recievedCommand = messageContent.toLowerCase().split(/ +/);

    // Process command
    command.fire_command(messageFull, userID, userName, messageType, userRole, recievedCommand[0].substr(1), recievedCommand[1], recievedCommand[2], recievedCommand[3]);
    }
},

/*bot.on('message', message => {

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
})*/

// Start the bot
client.login(config.bot.botToken);

// Start cronjobs

if (config.wallet.cronLcpStatus) // Post LCP Chain Status
    cron.cron_lcp_chain_status();
