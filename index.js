const { token } = require('./token.js')
const { isValidMorse, morseChatCommands } = require('./morseChat.js')
const { willBeStream } = require('./randomStream.js')

const prefix = '!'

const Discord = require('discord.js')
const client = new Discord.Client()

function parseCommand (msg) {
  let command = null

  const message = msg.content.replace(new RegExp(`^${prefix}\\w+\\s*`), cmd => {
    command = cmd.slice(1, cmd.length).trim()

    return ''
  })

  return { command, message }
}

client.commands = new Discord.Collection()

client.commands.set('morseCommands', new Map())
client.commands.set('streamCommands', new Map())

const morseCommands = client.commands.get('morseCommands')
const streamCommands = client.commands.get('streamCommands')

for (const command of morseChatCommands) {
  morseCommands.set(command.name, command)
}

streamCommands.set(willBeStream.name, willBeStream)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async (msg) => {
  if (
    // only for morze text chat
    msg.channel.id === '734092902770278482' &&
    msg.author.id !== '734092109036126359' &&
    !msg.author.bot
  ) {
    const { command, message } = parseCommand(msg)
    const cmd = morseCommands.get(command)

    if (cmd) {
      msg.reply(cmd.execute(message))
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
    const cmd = streamCommands.get(command)

    if (cmd) {
      const { answer, image } = await cmd.execute()

      msg.reply(answer, { files: [image] })
    }
  }
})

client.login(token)
