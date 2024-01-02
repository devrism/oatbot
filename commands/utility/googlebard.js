const { SlashCommandBuilder } = require('discord.js');
const { GOOGLE_BARD_TOKEN } = require('../../config.json');
const { BardAPI } = require('bard-api-node');

async function askGPT(interaction) {
    const assistant = new BardAPI();
    await assistant.setSession('__Secure-3PSID', GOOGLE_BARD_TOKEN);
    
    //let conversationId = 'junkland_conversation';
	var userInput = interaction.options.get('input')["value"];
	
	console.log('prompt: ' + userInput)

    let response = await assistant.getBardResponse(userInput);
    //console.log(response.content)
    return response.content;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('googlebard')
		.setDescription('Ask oatbot anything via Google Bard.')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The prompt for Google Bard.')
				.setRequired(true)
		),
	async execute(interaction) {
		await interaction.deferReply();

		let chatgptResponse = await askGPT(interaction);
		await interaction.editReply(String(chatgptResponse));
	}
};