const { token } = require('./token.js')
const { isValidMorse, morseChatCommands } = require('./morseChat.js')
const { willBeStream } = require('./randomStream.js')

const prefix = '!'

const Discord = require('discord.js')
const client = new Discord.Client()

function parseCommand (msg) {
  let command = null

  const message = msg.content.replace(new RegExp(`^${prefix}\\w+ `), cmd => {
    command = cmd.slice(1, cmd.length - 1)

    return ''
  })

  return { command, message }
}

client.commands = new Discord.Collection()

for (const command of morseChatCommands) {
  client.commands.set(command.name, command)
}

client.commands.set(willBeStream.name, willBeStream)

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
    const { command, message } = parseCommand(msg)
    console.log(`command == ${command}`)
    if (client.commands.has(command)) {
      msg.reply(client.commands.get(command).execute(message))
    } else if (!isValidMorse(msg.content)) {
      msg.delete()
    }
  }

  if (
    // only for main text chat
    msg.channel.id === '677142129046323226' &&
    msg.author.id !== '734092109036126359' &&
    !msg.author.bot
  ) {
    const { command } = parseCommand(msg)
    console.log(`command === ${command}`)
    if (client.commands.has(command)) {
      const { answer, image } = client.commands.get(command).execute()
      console.log('show me the answer')
      msg.reply(`AKOoka: ${answer}`)
    }
  }
})

client.login(token)
