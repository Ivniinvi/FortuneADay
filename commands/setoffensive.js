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
		.setName('setoffensive')
		.setDescription('Sets the offensive fortune flag.')
		.addBooleanOption(option =>
			option
				.setName('offensive')
				.setDescription('Send offensive fortunes')
				.setRequired(true))
		.setDMPermission(false),
	async execute(interaction) {
		var dailyData = load('dailydata.json');
		var guildFound = false;
		for (const index of dailyData.keys()) {
			if (dailyData[index][0] == interaction.guildId) {
				dailyData[index][2] = interaction.options.getBoolean('offensive');
				guildFound = true;
				break;
			}
		}
		if (guildFound == false) {
			dailyData.push([interaction.guildId, '0', interaction.options.getBoolean('offensive')]);
		}
		save(dailyData, 'dailydata.json');
		await interaction.reply(`Offensive fortune flag set to {interaction.options.getBoolean('offensive')}`);
	},
};
