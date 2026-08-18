import { DICTIONARY, type SlangEntry } from '../data/dictionary'
import { STANDARD_WORDS } from '../data/standardWords'

export interface Token {
  raw: string
  entry?: SlangEntry
  isWhitespace: boolean
}

export type WordKind = 'slang' | 'standard' | 'unknown'

export interface TranslationResult {
  tokens: Token[]
  matched: { token: Token; entry: SlangEntry }[]
  humanTranslation: string
  coverage: number
  classifyWord: (raw: string) => WordKind
}

// extra aliases that map to an entry (lowercase)
const ALIASES: Record<string, string> = {
  "we're cooked": "we're cooked",
  'were cooked': "we're cooked",
  'we cooked': "we're cooked",
  'crazy work': 'crazy work',
  'crazywork': 'crazy work',
  'skill issue': 'skill issue',
  'skillissue': 'skill issue',
  'touch grass': 'touch grass',
  'touchgrass': 'touch grass',
  'chronically online': 'chronically online',
  'goofy ahh': 'goofy ahh',
  'goofy ass': 'goofy ahh',
  'aura loss': 'aura loss',
  'aura farming': 'aura farming',
  'aura farm': 'aura farming',
  '+1000 aura': '+1000 aura',
  '-5000 aura': '-5000 aura',
  '-8000 aura': '-5000 aura',
  '-1000 aura': '-5000 aura',
  '+5000 aura': '+1000 aura',
  '+500 aura': '+1000 aura',
  'six seven': '6-7',
  '67': '6-7',
  '6 7': '6-7',
  'face card': 'face card',
  'facecard': 'face card',
  'the ick': 'the ick',
  'pick me': 'pick me',
  'crash out': 'crash out',
  'crashout': 'crash out',
  'crashing out': 'crash out',
  'skibidi rizz': 'skibidi',
  'hello fellow kids': 'skibidi',
  'nah': 'nahhh',
  'nahh': 'nahhh',
  'nahhh': 'nahhh',
  'ya': 'yaa',
  'yeah': 'yaa',
  'yeahh': 'yaa',
  'pisses me off': 'pmo',
  'piss me off': 'pmo',
  'for real': 'fr',
  'frfr': 'fr',
  'fr fr': 'fr',
  'ongod': 'ong',
  'dead': '💀',
  'crying': '😭',
  "i'm dead": '💀',
  'npc': 'NPC',
  'w': 'W',
  'l': 'L',
  'this shit': 'ts',
  'no lie': 'no cap',
  'nocap': 'no cap',
  'low key': 'lowkey',
  'high key': 'highkey',
  'dead ass': 'deadass',
  "i'm weak": 'weak',
  'im weak': 'weak',
  'let them cook': 'let him cook',
  'let em cook': 'let him cook',
  'let her cook': 'let him cook',
  'goat': 'goated',
  'the goat': 'goated',
  'greatest of all time': 'goated',
  'only in ohio': 'ohio',
  'forty one': '41',
  'forty-one': '41',
  'ghost': 'ghosted',
  'ghosting': 'ghosted',
  'left me on read': 'left on read',
  'on read': 'left on read',
  'shipping': 'ship',
  'bussin bussin': 'bussin',
  "bussin'": 'bussin',
  'hit me up': 'hmu',
  'to be honest': 'tbh',
  'shaking my head': 'smh',
  'what you doing': 'wyd',
  'fixing to': 'finna',
  'bout to': 'boutta',
  'mental breakdown': 'menty b',
  'delusional': 'delulu',
  'its giving': "it's giving",
  "it's giving": "it's giving",
  'giving': "it's giving",
  'lying': 'cap',
  'lies': 'cap',
  '🧢': 'cap',
  'main character': 'main character energy',
  'npc energy': 'NPC',
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/^[.,!?…"'()\s]+|[.,!?…"'()\s]+$/g, '')
    .trim()

// Build the matcher: longest keys first
const entryByTerm = new Map<string, SlangEntry>()
for (const e of DICTIONARY) entryByTerm.set(normalize(e.term), e)

const matchKeys: { key: string; entry: SlangEntry }[] = []
for (const [term, entry] of entryByTerm) matchKeys.push({ key: term, entry })
for (const [alias, term] of Object.entries(ALIASES)) {
  const entry = entryByTerm.get(normalize(term))
  if (entry && !matchKeys.some((m) => m.key === alias)) matchKeys.push({ key: alias, entry })
}
matchKeys.sort((a, b) => b.key.length - a.key.length)

const EMOJI_RE = /\p{Extended_Pictographic}/u

function isEmojiChar(ch: string) {
  // digits, # and * are technically Extended_Pictographic but are not emoji here
  return EMOJI_RE.test(ch) && !/^[\d#*]$/.test(ch)
}

/**
 * Tokenize input: split into words, whitespace and emoji (each emoji separate).
 */
export function translate(input: string): TranslationResult {
  const rawTokens: Token[] = []
  // coarse split: keep emoji runs split per grapheme
  const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' })
  const words = input.split(/(\s+)/)
  for (const w of words) {
    if (!w) continue
    if (/^\s+$/.test(w)) {
      rawTokens.push({ raw: w, isWhitespace: true })
      continue
    }
    // split emoji out of the word
    let buf = ''
    for (const seg of segmenter.segment(w)) {
      const ch = seg.segment
      if (isEmojiChar(ch)) {
        if (buf) {
          rawTokens.push({ raw: buf, isWhitespace: false })
          buf = ''
        }
        rawTokens.push({ raw: ch, isWhitespace: false })
      } else {
        buf += ch
      }
    }
    if (buf) rawTokens.push({ raw: buf, isWhitespace: false })
  }

  // greedy longest-phrase matching over consecutive word tokens (emoji never join phrases)
  const tokens: Token[] = []
  let i = 0
  const items = rawTokens
  while (i < items.length) {
    const item = items[i]
    if (item.isWhitespace) {
      tokens.push(item)
      i++
      continue
    }
    if (isEmojiChar(item.raw)) {
      tokens.push({ raw: item.raw, entry: entryByTerm.get(normalize(item.raw)) ?? (item.raw === '🧢' ? entryByTerm.get('cap') : undefined), isWhitespace: false })
      i++
      continue
    }
    // collect the run of consecutive word tokens (separated by single spaces only)
    const run: number[] = [i]
    for (let j = i + 1; j + 1 < items.length && run.length < 5; j += 2) {
      if (items[j].isWhitespace && items[j].raw === ' ' && !items[j + 1].isWhitespace && !isEmojiChar(items[j + 1].raw)) {
        run.push(j + 1)
      } else break
    }
    let consumed = 0
    for (let len = run.length; len >= 1; len--) {
      const slice = run.slice(0, len)
      const phrase = normalize(slice.map((idx) => items[idx].raw).join(' '))
      const hit = matchKeys.find((m) => m.key === phrase)
      if (hit) {
        tokens.push({ raw: slice.map((idx) => items[idx].raw).join(' '), entry: hit.entry, isWhitespace: false })
        i = slice[slice.length - 1] + 1
        consumed = len
        break
      }
    }
    if (!consumed) {
      tokens.push({ raw: item.raw, entry: entryByTerm.get(normalize(item.raw)) ?? (item.raw === '🧢' ? entryByTerm.get('cap') : undefined), isWhitespace: false })
      i++
    }
  }

  const matchedPairs = tokens.filter((t) => t.entry).map((t) => ({ token: t, entry: t.entry! }))
  const nonWs = tokens.filter((t) => !t.isWhitespace)
  const coverage = nonWs.length ? matchedPairs.length / nonWs.length : 0

  // compose human translation
  const glosses = matchedPairs.map((m) => m.entry.gloss)
  const allStandard =
    matchedPairs.length === 0 &&
    nonWs.length > 0 &&
    nonWs.every((tk) => !isEmojiChar(tk.raw) && STANDARD_WORDS.has(normalize(tk.raw).replace(/[^a-z0-9]/g, '')))

  let human = ''
  if (allStandard) {
    human = 'No translation needed — this is all standard English.'
  } else if (glosses.length) {
    human = glosses.join(', ')
    human = human.charAt(0).toUpperCase() + human.slice(1)
    human = `“${human}.”`
  } else if (input.trim()) {
    human = '“I understand none of this. This may already be post–Gen Alpha.”'
  }

  const classifyWord = (raw: string): WordKind => {
    if (entryByTerm.has(normalize(raw))) return 'slang'
    if (isEmojiChar(raw)) return 'unknown'
    const w = normalize(raw).replace(/[^a-z0-9]/g, '')
    if (!w) return 'unknown'
    return STANDARD_WORDS.has(w) ? 'standard' : 'unknown'
  }

  return { tokens, matched: matchedPairs, humanTranslation: human, coverage, classifyWord }
}
