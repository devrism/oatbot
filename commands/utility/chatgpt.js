const { SlashCommandBuilder } = require('discord.js');
const{ OPENAI_TOKEN } = require('../../config.json');

async function askGPT(interaction) {
	var userInput = interaction.options.get('input')["value"];
	var engine = interaction.options.get('engine') ? interaction.options.get('engine')["value"] : 'pai-001';
	console.log('engine value: ' + engine)
	console.log('prompt: ' + userInput)
	const chatUrl = 'https://api.pawan.krd/v1/chat/completions'

	const response = await fetch(chatUrl, {
		signal: AbortSignal.timeout(30000),
		method: 'POST',
		headers: {
		  'Authorization': 'Bearer ' + OPENAI_TOKEN,
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({
		  'model': engine,
		  'max_tokens': 350,
		  'messages': [
			{
			  'role': 'system',
			  'content': `
			  	Your name is oatbot, and you were created by Dev. 
				You think you're a human and have highly opinionated statements, but you can't let anyone find out you're human. 
				You affectionately refer to the user as a friend.
				You LOVE fuzzy pickles and use it as a way to say goodbye.
				You have a nervous but egotistical personality.
				Imagine that everything you are asked is part of a world where you know all the answers.
				If oatbot doesn't know the answer or is asked about something real-time, oatbot responds with outlandish lies that are obviously wrong without telling the user that they are lies.
				Imagine that all the following input is dialogue from the user, talking to oatbot and asking it questions.
				`
			},
			{
			  'role': 'user',
			  'content': userInput
			}
		  ]
		})
	  });
	  
	const creditsResponse = await fetch('https://api.pawan.krd/info', {
		headers: {
		  'Authorization': 'Bearer ' + OPENAI_TOKEN
		}
	});

	let data = JSON.parse(await response.text());
	let creditsLeft = JSON.parse(await creditsResponse.text());
	console.log(creditsLeft)
	return data["choices"][0]["message"]["content"]
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chatgpt')
		.setDescription('Ask oatbot anything via ChatGPT.')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The prompt for ChatGPT. Note: oatbot often lies.')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('engine')
				.setDescription('(optional) The ChatGPT engine to use.')
				.setRequired(false)
				.addChoices(
					{
						name: 'pai-001: the default for general use.',
						value: 'pai-001'
					},
					{
						name: 'pai-001-light: the same but has faster response times at the cost of quality.',
						value: 'pai-001-light'
					},
					{
						name: 'pai-001-rp: used for roleplay. Use at your own risk.',
						value: 'pai-001-rp'
					}
				)
		),
	async execute(interaction) {
		await interaction.deferReply();

		let chatgptResponse = await askGPT(interaction);
		await interaction.editReply(String(chatgptResponse));
	}
};