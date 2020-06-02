
module.exports = {
    "bot": {
        "botToken": "XXX", // Discord bot token
        "botID": "XXX", // Bot Discord ID - important else it react to own messages
        "commandPrefix": "+", // Bot prefix to trigger the bot
        "statusChannel": "XXX"
    },
    "wallet": {
        "server": "127.0.0.1", // Wallet server
        "user": "XXX", // Wallet username
        "password": "XXX", // Wallet password
        "port": "1234", // Wallet port
    },
    "cronTimes": {
        "statusLcpCronTime": 5 // In seconds
    },
    "colors": {
        "normal": "0xecf0f1", // grey
        "success": "0x2ecc71", // green
        "warning": "0xe67e22", // orange
        "error": "0xe74c3c", // red
        "special": "0xE91E63" // pink
    }
}