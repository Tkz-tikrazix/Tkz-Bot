const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const config = require('./config.json');

const commands = [];

const deployCommands = (dir = './commands/') => {
    fs.readdirSync(dir).forEach(dirs => {
        const commands = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

        for (const command of commands) {
            const cmd = require(`${dir}/${dirs}/${command}`);
            commands.push(cmd.data.toJSON());
        };

        const rest = new REST({ version: '10' }).setToken(config.token);

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationCommands(config.clientID),
                    { body: commands },
                );

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    });
};

deployCommands();
