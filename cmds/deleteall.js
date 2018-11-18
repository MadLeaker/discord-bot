const discord = require("discord.js")

module.exports.run = async(bot,message,args) => {
    if(message.author === message.guild.owner.user)
    {
        message.channel.bulkDelete(100)     
    }
    else
    {
        message.channel.send("You arent sans!")
        message.delete()
    }
    
}

module.exports.help = {
    name: "deleteall"
}