const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fs = require('node:fs');
const config = require('./config.json');

// Handling commands

client.commands = new Collection

const loadCommands = (dir = './commands/') => {
    fs.readdirSync(dir).forEach(dirs => {
        const commandFiles = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"))

        for (const file of commandFiles) {
            const command = require(`${dir}/${dirs}/${file}`);
            client.commands.set(command.data.name, command);
        };
    });
};

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Une erreur s\'est produite lors de l\'exécution de cette commande !', ephemeral: true });
	}
});

// Handling events

const loadEvents = (dir = './events/') => {
    fs.readdirSync(dir).forEach(dirs => {
        const events = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

        for (const event of events) {
            const evt = require(`${dir}/${dirs}/${event}`);
            if (evt.once) {
                client.once(evt.name, (...args) => evt.execute(...args));
            } else {
                client.on(evt.name, (...args) => evt.execute(...args));
            }
        };
    });
};

// Load

loadEvents();
loadCommands();

client.login(config.token);