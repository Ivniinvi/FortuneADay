const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

async function save(array, path) {
    fs.writeFile(path, JSON.stringify(array));
}

async function load(path) {
    const fileContent = fs.readFile(path);
    const array = JSON.parse(fileContent);
    return array;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setchannel')
		.setDescription('Sets the daily fortune channel.')
		.addChannelOption(option =>
			option
				.setName('channel')
				.setDescription('The channel to send daily fortunes in')
				.setRequired(true))
		.setDMPermission(false),
	async execute(interaction) {
		var dailyData = load('dailydata.json');
		var guildFound = false;
		for (const index of dailyData.keys()) {
			if (dailyData[index][0] == interaction.guildId) {
				dailyData[index][1] = interaction.options.getChannel('channel').id;
				guildFound = true;
				break;
			}
		}
		if (guildFound == false) {
			dailyData.push([interaction.guildId, interaction.options.getChannel('channel').id, false]);
		}
		save(dailyData, 'dailydata.json');
		await interaction.reply(`Fortune channel set to {interaction.options.getChannel('channel').toString()}`);
	},
};
