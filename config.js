
module.exports = {
    "bot": {
        "botToken": "XXX", // Discord bot token.
        "botID": "XXX", // Bot Discord ID - important else it react to own messages.
        "commandPrefix": "+", // Bot prefix to trigger the bot.
        "statusChannel": "XXX" // Channel ID where message will be posted in.
    },
    "wallet": {
        "server": "127.0.0.1", // Wallet server ip (default is the local machine).
        "user": "XXX", // Wallet rpc username.
        "password": "XXX", // Wallet rpc password.
        "port": "1234", // Wallet port.
    },
    "postTimes": {
        "statusLcpPostTime": 10, // Time in seconds to post message.
        "statusLcpDeleteTime": 9 // Time in seconds to delete message.
    }
}