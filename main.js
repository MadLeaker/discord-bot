const discord = require("discord.js");
const token = process.env.token
const bot = new discord.Client({});
const fs = require("fs")
const moment = require("moment")
bot.commands = new discord.Collection()

//Read Directory
fs.readdir("./cmds",(err,files)=> {
    if(err) return console.error(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0)
    {
        console.error("Couldnt find any commands!");
        return;
    }
    jsfile.forEach((f,i) => {
        let props = require(`./cmds/${f}`)
        console.info(`${f} is loaded`)
        bot.commands.set(props.help.name,props)

    })
})

const embedRarityColors = {
    rare: "#147dc0",
    legendary: "#d68029",
    uncommon: "#2f8f07",
    epic: "#b454da",
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
    
}

function itemShop()
{
    bot.channels.get("513758282830315527").send("@everyone Today item shop: " + moment().format('l'))
    let {body} = await superagent.get("https://fortnite-api.tresmos.xyz/store?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZW4xQHlvcG1haWwuY29tIiwidXNlcklkIjoiNWJlZWYxNTYyMjkwY2YxMmNjZGFiMTEwIn0.KFeMHoJLSH-MKcdRD8VAUtV5a8OiZvfK8g8ZYLPtKo4")
    body.forEach(element => {
        if(element.name === "Special forces" || element.name === "Brawler" || element.name === "Special Forces")
        {
            bot.users.get("413637141461991424").send(element.name + " is at the shop today! Go buy it!")
        }
        let rarity = element.rarity.replaceAt(0,element.rarity.charAt(0).toUpperCase())
        let type = element.type.replaceAt(0,element.type.charAt(0).toUpperCase())
        let featured = element.featured
        let embed = new discord.RichEmbed()
        embed.setColor(embedRarityColors[element.rarity])
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
        bot.channels.get("513758282830315527").send(embed)
        
    })
}

//Bot Events
bot.on("ready", async() => {
    setInterval(function(){
            if(moment.utc().hour().toLocaleString() == "18")
            {
                
            }
    },60000)
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity("on the server")
});



bot.on("message",async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = process.env.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandFile = bot.commands.get(cmd.slice(prefix.length))
    if(commandFile) commandFile.run(bot,message,args)
})



//Login
bot.login(token);