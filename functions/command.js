try {
    var config = process.cwd() + '/config.js';
    config = require(config);
} catch (error) {
    console.error('ERROR -> Unable to load config file.');
    process.exit(1);
}

var wallet = require("./wallet.js");


/* ------------------------------------------------------------------------------ */
// // // // // // // // // // // // // // // // // // // // // // // // // // // //
/* ------------------------------------------------------------------------------ */

const { Client } = require('discord.js');
const client = new Client();


/* ------------------------------------------------------------------------------ */
// // // // // // // // // // // // // // // // // // // // // // // // // // // //
/* ------------------------------------------------------------------------------ */

module.exports = {

    command_test: async function (msg) {

        var getInfo = await wallet.wallet_get_info();
        var getBlock = getInfo.blocks;

        msg.channel.send({
            embed: {
                color: 3447003,
                title: "POW is currenty turned ON!",
                fields: [{
                    name: "Current Block",
                    value: getBlock
                }
                ],
                timestamp: new Date(),
                footer: {
                    text: "Current Live Status"
                }
            }
        });

    },

    /* ------------------------------------------------------------------------------ */
    // !testrule -> Get Rules On or Off
    /* ------------------------------------------------------------------------------ */

    command_testrule: async function (msg) {
        var walletInfo = await wallet.wallet_get_info();
        var currentBlock = walletInfo.blocks;
        var rule1 = 1;
        var testruleInfo = await wallet.wallet_testrule_info(currentBlock, rule1);
        var ruleNumber1 = testruleInfo.ruleType;

        //Rule 1 (POW)
        if (ruleNumber1 === undefined) {
            msg.channel.send({
                embed: {
                    color: 3447003,
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
            });
            msg.delete(10000);

        } else {
            msg.channel.send({
                embed: {
                    color: 3447003,
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

    },


    fire_command: function (msg) {
        if (msg.channel.id === config.bot.statusChannel) {
            // Deal with command

            let args = msg.content.substring(config.bot.commandPrefix.length).split(" ");
            switch (args[0]) {
                case 'tr':
                    this.command_testrule(msg);
                    break;
            }
        }
    }
}