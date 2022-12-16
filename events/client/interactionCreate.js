const { Events, EmbedBuilder } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        if (interaction.customId === 'presence_online') {
            db.set('presence', 'online');
            interaction.update({ content: 'Le type de présence a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', components: [], ephemeral: true }); 
        } else if (interaction.customId === 'status_idle') {
            db.set('presence', 'idle');
            interaction.update({ content: 'Le type de présence a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', components: [], ephemeral: true });
        } else if (interaction.customId === 'status_dnd') {
            db.set('presence', 'dnd');
            interaction.update({ content: 'Le type de présence a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', components: [], ephemeral: true });
        } else if (interaction.customId === 'status_invisible') {
            db.set('presence', 'invisible');
            interaction.update({ content: 'Le type de présence a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', components: [], ephemeral: true });
        }  else if (interaction.customId === 'status_type_watching') {
            db.set('statustype', 'watching');
            interaction.update({ content: 'Le type de status a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', components: [], ephemeral: true });
        } else if (interaction.customId === 'status_type_competing') {
            db.set('statustype', 'competing');
            interaction.update({ content: 'Le type de status a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', components: [], ephemeral: true });
        } else if (interaction.customId === 'status_type_listening') {
            db.set('statustype', 'listening');
            interaction.update({ content: 'Le type de status a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', components: [], ephemeral: true });
        } else if (interaction.customId === 'status_type_playing') {
            db.set('statustype', 'playing');
            interaction.update({ content: 'Le type de status a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', components: [], ephemeral: true });
        } else if (interaction.customId === 'status_type_streaming') {
            db.set('statustype', 'streaming');
            interaction.update({ content: 'Le type de status a été modifié avec succès, redémarrez le bot pour que les changements soient pris en compte !', components: [], ephemeral: true });
        }
    },
};