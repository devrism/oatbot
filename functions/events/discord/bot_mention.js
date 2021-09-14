// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let messageResponse = await lib.discord.channels['@0.0.6'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: [
    `henlo <@!${context.params.event.author.id}>! I'm working on rebuilding myself.`,
    `I don't do much for now, but stay tuned!`
  ].join('\n'),
  embed: {
    title: 'Guild Information',
    type: 'rich',
    color: 0x00AA00, // Green color
    description: 'weh!',
    fields: [{
      name: 'Message Formatting',
      value: [
        'Check out this link for more details on formatting message embeds:',
        'https://discord.com/developers/docs/resources/channel#embed-object-embed-structure'
      ].join('\n')
    }, {
      name: 'Setting up Slash Commands',
      value: [
        'Check out the README for this bot on Autocode for help setting up slash commands:',
        'https://autocode.com/app/discord/basic-discord-example/'
      ].join('\n')
    }]
  },
  tts: false
});

return messageResponse;
