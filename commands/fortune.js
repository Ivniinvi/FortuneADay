const { SlashCommandBuilder } = require('discord.js');

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
		.setName('fortune')
		.setDescription('Provides a random fortune.'),
	async execute(interaction) {
		var dailyData = load('dailydata.json');
                var guildFound = false;
		var offensive = false;
                for (const index of dailyData.keys()) {
                        if (dailyData[index][0] == interaction.guildId) {
                                offensive = dailyData[index][1];
                                guildFound = true;
                                break;
                        }
                }
                if (guildFound == false) {
                        dailyData.push([interaction.guildId, '0', false]);
                }
                save(dailyData, 'dailydata.json');
		if (offensive) {
			fortunes = await load('combinedalldata.txt');
			fortune = fortunes.data[Math.floor(Math.random() * file.data.length)];
			await interaction.reply(fortune);
		}
		else {
			fortunes = await load('combinedcleandata.txt');
                        fortune = fortunes.data[Math.floor(Math.random() * file.data.length)];
                        await interaction.reply(fortune);
		}
	},
};
