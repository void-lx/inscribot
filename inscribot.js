const Discord = require('discord.js');
const Twitch = require('tmi.js');
const config = require('./config.json');
const tClient = new Twitch.Client({
    options: {
        debug: true
    },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: config.twitch.Username,
        password: config.twitch.Token
    },
    channels: [config.twitch.Channel]
});
const dClient = new Discord.Client();

var subscache = [];
var is_Open = false;



//evento on message do chat da twitch
tClient.on('message', (channel, tags, message, self) => {

    if (message.toLowerCase().startsWith((config.bot.Prefix) + 'inscrição ')) {
        if (is_Open) {
            if (subscache.includes(tags.username)) {
                tClient.say(config.twitch.Channel, `@${tags.username}, Você já está inscrito`);
            } else {
                subscache.push(tags.username)
                string = 'nick da twitch: ' + tags.username + ' ' + message.substr(1);
                dClient.channels.cache.get(config.discord.Inscricao).send(string);
                tClient.say(config.twitch.Channel, `@${tags.username}, inscrição feita com sucesso!`);
            }
        } else {
            tClient.say(config.twitch.Channel, `@${tags.username}, as inscrições estão fechadas`);
        }
    }

    if (message.toLowerCase().startsWith(config.bot.Prefix + 'resultado ')) {
            if (subscache.includes(tags.username)) {
                //enviar resultado
                dClient.channels.cache.get(config.discord.Resultado).send(message.substr(1));
                subscache.splice(subscache.indexOf(tags.username), 1)
                tClient.say(config.twitch.Channel, `@${tags.username}, resultado enviado.`);

            } 
    }

    if (message.toLowerCase() === config.bot.Prefix + 'ajudacamp') {
        tClient.say(config.twitch.Channel, `Para se inscrever basta digitar no chat !inscrição [nick da CFN]. Ex: !inscrição joãozinho.   Para reportar o resutado da sua partida envie !resultado [player1 score x score player2]. Ex: !resultado joãozinho 0 x 2 zezinho`);
    }

    if (message.toLowerCase() === config.bot.Prefix + 'iniciar' && tags.username === config.twitch.Channel) {
        is_Open = true
        tClient.say(config.twitch.Channel, `As inscrições para o torneio estão abertas!`);
    }

    if (message.toLowerCase() === config.bot.Prefix + 'encerrar' && tags.username === config.twitch.Channel) {
        is_Open = true
        tClient.say(config.twitch.Channel, `As inscrições para o torneio estão encerradas!`);
    }

});

//evento onready do discord
dClient.on('ready', () => {
    //se quiser alguma mensgem ou comando quando o bot logar, é aqui.
});

//evento onmessage
dClient.on('message', async msg => {
// pega mensagens do chat.
//exemplo abaixo responde olá! ao usuário que enviar !oi:
    /*if (msg.content.toLowerCase() === (config.bot.Prefix + "oi")) {
        msg.reply("olá!");
    }*/
});

//inicia os clients
tClient.connect();
dClient.login(config.discord.DiscordToken);
