const discord = require('discord.js')
const superagent = require('superagent')

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

module.exports.run = async(bot,message,args) => {
    message.delete()
    let {body} = await superagent.get("https://fortnite-api.tresmos.xyz/store?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZW4xQHlvcG1haWwuY29tIiwidXNlcklkIjoiNWJlZWYxNTYyMjkwY2YxMmNjZGFiMTEwIn0.KFeMHoJLSH-MKcdRD8VAUtV5a8OiZvfK8g8ZYLPtKo4")
    
    body.forEach(element => {
        let rarity = element.rarity.replaceAt(0,element.rarity.charAt(0).toUpperCase())
        let type = element.type.replaceAt(0,element.type.charAt(0).toUpperCase())
        let featured = element.featured
        let embed = new discord.RichEmbed()
        embed.setColor("#d80f0f")
        embed.setTitle(element.name)
        embed.addField("Cost",element.cost + " Vbucks")
        embed.addField("Rarity",rarity)
        embed.addField("Type",type)
        if(featured === 1)
        {
            embed.addField("Shop type","Featured")
        }
        else
        {
            embed.addField("Shop type","Daily")
        }
        embed.setImage(element.images.background)
        
        message.channel.send(embed)
    });
    
}

module.exports.help = {
    name: "itemshop"
}