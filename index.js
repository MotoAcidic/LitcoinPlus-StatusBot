try {
    var config = process.cwd() + '/config.js';
    config = require(config);
} catch (error) {
    console.error('ERROR -> Unable to load config file.');
    process.exit(1);
}
const discord = require('discord.js');
const client = new discord.Client();

var wallet = require("./functions/wallet.js");

client.on('ready', () => {
    console.log('The bot has come online!');
});


setInterval( async function () {
        var walletInfo = await wallet.wallet_get_info();
        var currentBlock = walletInfo.blocks;
        var rule1 = 1;
        var testruleInfo = await wallet.wallet_testrule_info(currentBlock, rule1);
        var ruleNumber1 = testruleInfo.ruleType;
        var statusChannel = client.channels.find(channel => channel.id === config.bot.statusChannel);

        if (ruleNumber1 === undefined) {
            statusChannel.send({
                embed: {
                    color: 0x2ecc71,
                    title: "POW is currenty turned ON!",
                    fields: [{
                        name: "Current Block",
                        value: currentBlock
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: "Current Live Status"
                    }
                }
                
            }).catch((e) => { console.log(e); });

        } else {
            statusChannel.send({
                embed: {
                    color: 0xe74c3c,
                    title: "POW is currenty turned OFF!",
                    fields: [{
                        name: "Current Block",
                        value: currentBlock
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: "Current Live Status"
                    }
                }
            });
        }
    return;
    
}, config.postTimes.statusLcpPostTime * 1000);

client.on('message', (message) => {
    if (message.channel.id === config.bot.statusChannel) {

        message.delete(config.postTimes.statusLcpDeleteTime * 1000);

    }
});

// Start the bot
client.login(config.bot.botToken);