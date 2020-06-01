
module.exports = {
    "bot": {
        "botToken": "XXX", // Discord bot token
        "botID": "XXX", // Bot Discord ID - important else it react to own messages
        "commandPrefix": "+" // Bot prefix to trigger the bot
    },
    "wallet": {
        "server": "127.0.0.1", // Wallet server
        "user": "XXX", // Wallet username
        "password": "XXX", // Wallet password
        "port": "1234", // Wallet port
    },
    "cronTimes": {
        "statusLcpCronTime": 30,
        "statusChainCronTime": 60
    }
}