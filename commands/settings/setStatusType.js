const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require('quick.db');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('setstatustype')
        .setDescription('Configure le type de status du bot')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Le type de status du bot')
                .addChoices(
                    { name: 'Regarder', value: 'watching' },
                    { name: 'Participe A', value: 'competing' },
                    { name: 'Ecoute', value: 'listening' },
                    { name: 'Joue', value: 'playing' },
                    { name: 'Stream', value: 'streaming'}
                )
        ),
    async execute(interaction) {
        const setStatusType = interaction.options.getString('type');
        if (setStatusType === 'watching') {
            db.set('statustype', 'watching');
            interaction.reply({ content: 'Le type de status a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', ephemeral: true });
        } else if (setStatusType === 'competing') {
            db.set('statustype', 'competing');
            interaction.reply({ content: 'Le type de status a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', ephemeral: true });
        } else if (setStatusType === 'listening') {
            db.set('statustype', 'listening');
            interaction.reply({ content: 'Le type de status a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', ephemeral: true });
        } else if (setStatusType === 'playing') {
            db.set('statustype', 'playing');
            interaction.reply({ content: 'Le type de status a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', ephemeral: true });
        } else if (setStatusType === 'streaming') {
            db.set('statustype', 'streaming');
            interaction.reply({ content: 'Le type de status a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', ephemeral: true });
        } else {
            const status = new EmbedBuilder()
                .setTitle('Configuration de la présence du bot')
                .setDescription('Selectionnez une option ci-dessous pour modifier la présence du bot')
                .setColor(0x0099FF)
                .setTimestamp()
            const statusRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('status_type_watching')
                        .setLabel('Regarder')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('status_type_competing')
                        .setLabel('Participe A')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('status_type_listening')
                        .setLabel('Ecoute')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('status_type_playing')
                        .setLabel('Joue')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('status_type_streaming')
                        .setLabel('Stream')
                        .setStyle(ButtonStyle.Primary)
                );
            await interaction.reply({ embeds: [status], components: [statusRow] });
        }
    },
};