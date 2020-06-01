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

    /* ------------------------------------------------------------------------------ */
    // !listrules -> Get the current list of rules
    /* ------------------------------------------------------------------------------ */

    command_listrules: async function (userID, userName, messageType, msg) {
        var ruleInfo = await wallet.wallet_listrules();
        // If wallet not reachable

        var alertID = ruleInfo.alertId;
        var rulePacket = ruleInfo.nVersion;
        var ruleID = ruleInfo.nID;
        var lowVersion = ruleInfo.nMinVer;
        var highVersion = ruleInfo.nMaxVer;
        var startHeight = ruleInfo.fromHeight;
        var endHeight = ruleInfo.toHeight;
        var ruleNumber = ruleInfo.ruleType;
        var ruleValue = ruleInfo.ruleValue;

        chat.chat_reply(msg, 'embed', false, messageType, config.colors.success, false, config.messages.listrules.title,
            [
                [config.messages.listrules.alertID, alertID, true],
                [config.messages.listrules.packetversion, rulePacket, true],
                [config.messages.listrules.ruleID, ruleID, true],
                [config.messages.listrules.lowestversion, lowVersion, true],
                [config.messages.listrules.highestversion, highVersion, true],
                [config.messages.listrules.startblock, startHeight, true],
                [config.messages.listrules.endblock, endHeight, true],
                [config.messages.listrules.ruletype1, ruleNumber, true],
                [config.messages.listrules.rulevalue1, ruleValue, true]
            ], false, false, false, false);
        //chat.chat_reply(msg, 'embed', false, messageType, config.colors.success, false, config.messages.chain.title, [[config.messages.chain.chainblockexplorer, chainExplorer, true], [config.messages.chain.chainblockbackupexplorer, chainBackupExplorer, true], [config.messages.chain.chainblockbot, chainBlock, false], [config.messages.chain.poolblockbot, poolBlock, false], [config.messages.chain.chainbestblockhash, chainBlockhash, false], [config.messages.chain.poolbestblockhash, poolBlockhash, true]], false, false, false, false);
        return;
    },

    /* ------------------------------------------------------------------------------ */
    // !testrule -> Get Rules On or Off
    /* ------------------------------------------------------------------------------ */

    command_testrule: async function (manuallyFired, userName, messageType, userRole, msg) {
        var walletInfo = await wallet.wallet_get_info();
        var currentBlock = walletInfo.blocks;
        var rule1 = 1; var testruleInfo = await wallet.wallet_testrule_info(currentBlock, rule1); var ruleNumber1 = testruleInfo.ruleType;
        var rule8 = 8; var testrule8Info = await wallet.wallet_testrule8_info(currentBlock, rule8); var ruleNumber8 = testrule8Info.ruleType;

        // If wallet not reachable
        if (walletInfo === 'error') { chat.chat_reply(msg, 'embed', userName, messageType, config.colors.error, false, config.messages.title.error, false, config.messages.walletOffline, false, false, false, false); return; }
        if (testruleInfo === 'error') { chat.chat_reply(msg, 'embed', userName, messageType, config.colors.error, false, config.messages.title.error, false, config.messages.noListRules, false, false, false, false); return; }
        if (testrule8Info === 'error') { chat.chat_reply(msg, 'embed', userName, messageType, config.colors.error, false, config.messages.title.error, false, config.messages.noListRules, false, false, false, false); return; }

        //Rule 1 (POW)
        if (ruleNumber1 === undefined) {
            chat.chat_reply('status', 'embed', false, messageType, config.colors.success, false, config.messages.testrule.rule1ON, false, [config.messages.testrule.currentBlock, currentBlock], false, false, false, false).then(function (reactCollectorMessage) {
                // Save message to global eventCollectorMessage
                eventCollectorMessage = reactCollectorMessage;
                chat.chat_delete_message(eventCollectorMessage);
            });

        } else {
            chat.chat_reply('status', 'embed', false, messageType, config.colors.special, false, config.messages.testrule.rule1OFF, false, [config.messages.testrule.currentBlock, currentBlock], false, false, false, false).then(function (reactCollectorMessage) {
                // Save message to global eventCollectorMessage
                eventCollectorMessage = reactCollectorMessage;
                chat.chat_delete_message(eventCollectorMessage);
            });
            return;
        }

        //Rule 8 (POS)
        if (ruleNumber8 === undefined) {
            chat.chat_reply('status', 'embed', false, messageType, config.colors.success, false, config.messages.testrule.rule8ON, false, [config.messages.testrule.currentBlock, currentBlock], false, false, false, false).then(function (reactCollectorMessage) {
                // Save message to global eventCollectorMessage
                eventCollectorMessage = reactCollectorMessage;
                chat.chat_delete_message(eventCollectorMessage);
            });
        } else {
            chat.chat_reply('status', 'embed', false, messageType, config.colors.special, false, config.messages.testrule.rule8OFF, false, [config.messages.testrule.currentBlock, currentBlock], false, false, false, false).then(function (reactCollectorMessage) {
                // Save message to global eventCollectorMessage
                eventCollectorMessage = reactCollectorMessage;
                chat.chat_delete_message(eventCollectorMessage);
            });
            return;
        }

        //chat.chat_delete_message(eventCollectorMessage);
    }
}