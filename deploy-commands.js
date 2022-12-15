const { REST, Routes } = require('discord.js');
const config = require('./config.json');
const fs = require('node:fs');

const commands = [];

const deployCommands = (dir = './commands') => {
    fs.readdirSync(dir).forEach(dirs => {
        const commandsFiles = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        for (const file of commandsFiles) {
            const command = require(`${dir}/${dirs}/${file}`);
            commands.push(command.data.toJSON());
        }

        const rest = new REST({ version: '10' }).setToken(config.token);

        (async () => {
            try {
                console.log(`Started refreshing ${commands.length} application (/) commands.`);
        
                const data = await rest.put(
                    Routes.applicationGuildCommands(config.clientId, config.guildId),
                    { body: commands },
                );
        
                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
            } catch (error) {
                console.error(error);
            }
        })();
    })
}

deployCommands();
