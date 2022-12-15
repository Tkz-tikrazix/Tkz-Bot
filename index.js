const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fs = require('node:fs');
const config = require('./config.json');

// Handling commands

client.commands = new Collection();

const loadCommands = (dir = './commands/') => {
    fs.readdirSync(dir).forEach(dirs => {
        const commands = fs.readdir(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

        for (const file of commands) {
            const command = require(`${dir}/${dirs}/${file}`);
            client.commands.set(command.data.name, command);
        };
    });
};

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
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