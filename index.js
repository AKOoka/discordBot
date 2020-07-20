/* global token */
const { isValidMorze, morseChatCommands } = require('./morseChat.js')

const prefix = '!'

const Discord = require('discord.js')
const client = new Discord.Client()

client.commands = new Discord.Collection()

for (const command of morseChatCommands) {
  client.commands.set(command.name, command)
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (
    // only for morze text chat
    msg.channel.id === '734092902770278482' &&
    msg.author.id !== '734092109036126359' &&
    !msg.author.bot
  ) {
    let command = null
    const message = msg.content.replace(new RegExp(`^${prefix}\\w+ `), cmd => {
      command = cmd.slice(1, cmd.length - 1)

      return ''
    })

    if (client.commands.has(command)) {
      msg.reply(client.commands.get(command).execute(message))
    } else if (!isValidMorze(msg.content)) {
      msg.delete()
    }
  }
})

client.login(token)
