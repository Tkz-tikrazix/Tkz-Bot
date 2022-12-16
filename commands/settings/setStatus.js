const { SlashCommandBuilder } = require('discord.js');
const db = require('quick.db');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('setstatus')
        .setDescription('Configure le status du bot')
        .addStringOption(option =>
            option.setName('status')
                .setDescription('Le status du bot')
                .setRequired(true)
        ),
    async execute(interaction) {
        const setStatus = interaction.options.getString('status');
        db.set('status', setStatus);
        interaction.reply({ content: 'Le status a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', ephemeral: true });
    },
};