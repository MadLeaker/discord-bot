const discord = require("discord.js");
const token = process.env.token
const bot = new discord.Client({});
const fs = require("fs")
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

//Bot Events
bot.on("ready", async() => {
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