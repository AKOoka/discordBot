const dot = '.'
const dash = '-'

const morseAlphabet = {
  a: '.-',
  b: '-...',
  c: '-.-.',
  d: '-..',
  e: '.',
  f: '..-.',
  g: '--.',
  h: '....',
  i: '..',
  j: '.---',
  k: '-.-',
  l: '.-..',
  m: '--',
  n: '-.',
  o: '---',
  p: '.--.',
  q: '--.-',
  r: '.-.',
  s: '...',
  t: '-',
  u: '..-',
  v: '...-',
  w: '.--',
  x: '-..-',
  y: '-.--',
  z: '--..',
  1: '.----',
  2: '..---',
  3: '...--',
  4: '....-',
  5: '.....',
  6: '-....',
  7: '--...',
  8: '---..',
  9: '----.',
  0: '-----',
  '.': '.-.-.-',
  '!': '-.-.--',
  '?': '..--..',
  '&': '.-...',
  '/': '-..-.',
  "'": '.----.'
}

const altNotation = {
  dot: /[0oOоО.]/, // latin and cyrillic letter 'O'
  dash: /[-_]/
}

function normalizeChar (char) {
  if (altNotation.dot.test(char)) {
    return dot
  } else if (altNotation.dash.test(char)) {
    return dash
  } else if (char !== ' ') {
    return null
  }
}

function morseTransition (state, transition) {
  switch (state) {
    case '':
      if (transition === dot) {
        return 'e'
      } else {
        return 't'
      }

    case 'e': // .
      if (transition === dot) {
        return 'i'
      } else {
        return 'a'
      }
    case 't': // -
      if (transition === dot) {
        return 'n'
      } else {
        return 'm'
      }

    case 'i': // ..
      if (transition === dot) {
        return 's'
      } else {
        return 'u'
      }
    case 'a': // .-
      if (transition === dot) {
        return 'r'
      } else {
        return 'w'
      }
    case 'n': // -.
      if (transition === dot) {
        return 'd'
      } else {
        return 'k'
      }
    case 'm': // --
      if (transition === dot) {
        return 'g'
      } else {
        return 'o'
      }

    case 's': // ...
      if (transition === dot) {
        return 'h'
      } else {
        return 'v'
      }
    case 'u': // ..-
      if (transition === dot) {
        return 'f'
      } else {
        return 2
      }
    case 'r': // .-.
      if (transition === dot) {
        return 'l'
      } else {
        return 11
      }
    case 'w': // .--
      if (transition === dot) {
        return 'p'
      } else {
        return 'j'
      }
    case 'd': // -..
      if (transition === dot) {
        return 'b'
      } else {
        return 'x'
      }
    case 'k': // -.-
      if (transition === dot) {
        return 'c'
      } else {
        return 'y'
      }
    case 'g': // --.
      if (transition === dot) {
        return 'z'
      } else {
        return 'q'
      }
    case 'o': // ---
      if (transition === dot) {
        return 8
      } else {
        return 0 // uncomplete state
      }

    case 'h': // ....
      if (transition === dot) {
        return '5'
      } else {
        return '4'
      }
    case 'v': // ...-
      if (transition === dot) {
        return null
      } else {
        return '3'
      }
    case 'f': // ..-.
      if (transition === dot) {
        return null
      } else {
        return null
      }
    case 2: // ..--
      if (transition === dot) {
        return 13
      } else {
        return '2'
      }
    case 11: // .-.-
      if (transition === dot) {
        return 12
      } else {
        return null
      }
    case 'l': // .-..
      if (transition === dot) {
        return '&'
      } else {
        return null
      }
    case 'p': // .--.
      if (transition === dot) {
        return null
      } else {
        return null
      }
    case 'j': // .---
      if (transition === dot) {
        return null
      } else {
        return '1'
      }
    case 'b': // -...
      if (transition === dot) {
        return '6'
      } else {
        return null
      }
    case 'x': // -..-
      if (transition === dot) {
        return '/'
      } else {
        return null
      }
    case 'c': // -.-.
      if (transition === dot) {
        return null
      } else {
        return 10
      }
    case 'y': // -.--
      if (transition === dot) {
        return null
      } else {
        return null
      }
    case 'z': // --..
      if (transition === dot) {
        return '7'
      } else {
        return null
      }
    case 'q': // --.-
      if (transition === dot) {
        return null
      } else {
        return null
      }
    case 8: // ---.
      if (transition === dot) {
        return '8'
      } else {
        return null
      }
    case 0: // ----
      if (transition === dot) {
        return '9'
      } else {
        return '0'
      }

    case '5': // .....
      if (transition === dot) {
        return null
      } else {
        return null
      }
    case '4': // ....-
      if (transition === dot) {
        return null
      } else {
        return null
      }
    case '3': // ...--
      if (transition === dot) {
        return null
      } else {
        return null
      }
    case 13: // ..--.
      if (transition === dot) {
        return '?'
      } else {
        return null
      }
    case '2': // ..---
      if (transition === dot) {
        return null
      } else {
        return null
      }
    case 12: // .-.-.
      if (transition === dot) {
        return null
      } else {
        return '.'
      }
    case '&': // .-...
      if (transition === dot) {
        return null
      } else {
        return null
      }
    case '1': // .----
      if (transition === dot) {
        return "'"
      } else {
        return null
      }
    case '6': // -....
      if (transition === dot) {
        return null
      } else {
        return null
      }
    case '/': // -..-.
      if (transition === dot) {
        return null
      } else {
        return null
      }
    case 10: // -.-.-
      if (transition === dot) {
        return null
      } else {
        return '!'
      }
    case '7': // --...
      if (transition === dot) {
        return null
      } else {
        return null
      }
    case '8': // ---..
      if (transition === dot) {
        return null
      } else {
        return null
      }
    case '9': // ----.
      if (transition === dot) {
        return null
      } else {
        return null
      }
    case '0': // -----
      if (transition === dot) {
        return null
      } else {
        return null
      }

    case '?': // ..--..
      if (transition === dot) {
        return null
      } else {
        return null
      }
    case '.': // .-.-.-
      if (transition === dot) {
        return null
      } else {
        return null
      }
    case "'": // .----.
      if (transition === dot) {
        return null
      } else {
        return null
      }
    case '!': // -.-.--
      if (transition === dot) {
        return null
      } else {
        return null
      }

    default:
      return state
  }
}

function morseSpaceTransition (state, transition) {
  switch (state) {
    case -1:
      if (transition === dot || transition === dash) {
        return ''
      } else {
        return ' '
      }
    case ' ':
      if (transition === dot || transition === dash) {
        return ''
      } else {
        return -2
      }
    case -2:
      if (transition === dot || transition === dash) {
        return ''
      } else {
        return state
      }
    default:
      if (transition === dot || transition === dash) {
        return state
      } else {
        return -1
      }
  }
}

function isValidMorse (msg) {
  for (const char of [...msg]) {
    if (normalizeChar(char) === null) {
      return false
    }
  }

  return true
}

const engToMorseCommand = {
  name: 'etm',
  description: 'transform english to morse',
  execute (msg) {
    let outputMsg = ''

    for (const word of msg.split(' ')) {
      for (const letter of [...word]) {
        outputMsg += morseAlphabet[letter] + ' '
      }

      outputMsg += '       '
    }

    return outputMsg
  }
}

const morseToEngCommand = {
  name: 'mte',
  description: 'transform morse to english',
  execute (msg) {
    let outputMsg = ''
    let lastState = ''
    let state = ''

    for (const morse of [...msg + ' ']) {
      const normMorse = normalizeChar(morse)

      if (normMorse === null) {
        return `\`\`\`"${morse}" - is not valid morse character\`\`\``
      }

      state = morseSpaceTransition(state, normMorse)
      state = morseTransition(state, normMorse)

      if (state === -1) {
        outputMsg += lastState
      } else if (state === ' ') {
        outputMsg += state
      }

      lastState = state
    }

    return outputMsg
  }
}

module.exports = {
  isValidMorse,
  morseChatCommands: [
    engToMorseCommand,
    morseToEngCommand
  ]
}
