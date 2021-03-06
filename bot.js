const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready',() =>{
  console.log('I\'m Online\nSuccessfully\nUpdated\!');
})
var prefix = "K!"
client.on('message', message => {
  if (!message.content.startsWith(prefix)) return;
  let args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');
  if (message.author.bot) return;

  if (message.content.startsWith(prefix + 'ping')) {
    var start = new Date().getTime()
    message.channel.send("Pinging...").then((message) => {
        var end = new Date().getTime()
        message.edit("Pong! | Took **" + (end - start) + "**ms");
    });
  } else // Ping Command (SOURCE: ADVAITH)

  if (message.content.startsWith(prefix + 'setgame')) {
    let allowed = ["318882324597047308", "217006264570347520", "190916650143318016"]
    if (!allowed.includes(message.author.id)) return;
    client.user.setGame(argresult);
  }

  if (message.content.startsWith(prefix + 'eval')) {
    let allowed = ["318882324597047308", "217006264570347520", "190916650143318016", "248540313059196928"]
    if (!allowed.includes(message.author.id)) return;
    try {
      var code = args.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.sendCode("xl", clean(evaled));
    } catch(err) {
      message.channel.sendMessage("There was an error, please be cautious of your typing, you may or may not missed anything.")
    }
  }

  setInterval(() => {
  client.user.setPresence({
          status: "online",
          activity: {
            name: `${client.guilds.size} servers | K! | google.com is the best search engine.`,
            type: 3,
          }
        })
  }, 10000)

});

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.login(process.env.TOKEN);
