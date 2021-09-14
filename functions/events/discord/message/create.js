// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let messageContent = [
  `👋`
];

if (context.service.environment) {
  messageContent = messageContent.concat([
    `henlo <@!${context.params.event.author.id}>! I'm working on improving myself.`,
    `I don't do much for now, but stay tuned!`
  ]);
} else {
  messageContent = messageContent.concat([
    `henlo <@!${context.params.event.author.id}>! I'm working on improving myself.`,
    `I don't do much for now, but stay tuned!`
  ]);
}

// respond to messages containing the word "testbot"
if (context.params.event.content.match(/\bthanks oatbot/i)) {
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: context.params.event.channel_id,
    content: messageContent.join('\n'),
    message_reference: {
      message_id: context.params.event.id
    }
  });
// respond to messages containing "/oat"
} else if (context.params.event.content.match(/.*\/oat.*/)) {
  await lib.discord.channels['@0.2.0'].messages.reactions.create({
    emoji: `<:bandaid:304863358325358602>`,
    message_id: `${context.params.event.id}`,
    channel_id: `${context.params.event.channel_id}`
  });
}

