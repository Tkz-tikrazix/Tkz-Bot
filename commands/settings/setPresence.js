const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require('quick.db');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('setpresence')
        .setDescription('Configure la présence du bot')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('La présence du bot')
                .addChoices(
                    { name: 'En ligne', value: 'onligne' },
                    { name: 'Inactif', value: 'idle' },
                    { name: 'Ne pas déranger', value: 'dnd' },
                    { name: 'Invisible', value: 'invisible' }
                )
        ),
    async execute(interaction) {
        const setStatus = interaction.options.getString('type');
        if (setStatus === 'onligne') {
            db.set('presence', 'online');
            interaction.reply({ content: 'Le type de présence a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', ephemeral: true });
        } else if (setStatus === 'idle') {
            db.set('presence', 'idle');
            interaction.reply({ content: 'Le type de présence a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', ephemeral: true });
        } else if (setStatus === 'dnd') {
            db.set('presence', 'dnd');
            interaction.reply({ content: 'Le type de présence a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', ephemeral: true });
        } else if (setStatus === 'invisible') {
            db.set('presence', 'invisible');
            interaction.reply({ content: 'Le type de présence a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', ephemeral: true });
        } else {
            const status = new EmbedBuilder()
                .setTitle('Configuration de la présence du bot')
                .setDescription('Selectionnez une option ci-dessous pour modifier la présence du bot')
                .setColor(0x0099FF)
                .setTimestamp()
            const statusRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('presence_online')
                        .setLabel('En ligne')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('status_idle')
                        .setLabel('Inactif')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('status_dnd')
                        .setLabel('Ne pas déranger')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('status_invisible')
                        .setLabel('Invisible')
                        .setStyle(ButtonStyle.Primary),
                );
            await interaction.reply({ embeds: [status], components: [statusRow] });
        }
    },
};