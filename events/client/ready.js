const { Events, ActivityType } = require('discord.js');
const db = require('quick.db');
const presence = db.get('presence');
const statustype = db.get('statustype');
const status = db.get('status');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`${client.user.tag} est disponible !`);
		if (status != undefined) {
			if (statustype === 'watching') {
				client.user.setPresence({ activities: [{ name: status, type: ActivityType.Watching }], status: presence });
			} else if (statustype === 'competing') {
				client.user.setPresence({ activities: [{ name: status, type: ActivityType.Competing }], status: presence });
			} else if (statustype === 'listening') {
				client.user.setPresence({ activities: [{ name: status, type: ActivityType.Listening }], status: presence });
			} else if (statustype === 'playing') {
				client.user.setPresence({ activities: [{ name: status, type: ActivityType.Playing }], status: presence });
			} else if (statustype === 'streaming') {
				client.user.setPresence({ activities: [{ name: status, type: ActivityType.Streaming }], status: presence });
			}
		}
	},
};