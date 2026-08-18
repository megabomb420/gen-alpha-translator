export const HERO_EXAMPLES = [
  'bro 😭',
  "we're cooked 💀",
  'yaa 😭🙏',
  '-5000 aura',
  'what is bro yapping about',
  "that's so ohio 💀",
  'chat… let him cook',
]

export interface EmojiCard {
  emoji: string
  literal: string
  actual: string
  example: string
  translation: string
}

export const EMOJI_CARDS: EmojiCard[] = [
  {
    emoji: '😭',
    literal: 'crying',
    actual: '"i can\'t / i\'m dying / no way"',
    example: 'she dropped her fries 😭',
    translation: '“A tragedy of the highest order has occurred.”',
  },
  {
    emoji: '💀',
    literal: 'skull',
    actual: '"died laughing / what did i just watch"',
    example: 'dad tried to dab 💀',
    translation: '“Dad tried to dab. I died.”',
  },
  {
    emoji: '🙏',
    literal: 'praying',
    actual: '"please / help / i beg you"',
    example: 'please no homework today 🙏',
    translation: '“Please let there be no homework today.”',
  },
  {
    emoji: '🥀',
    literal: 'wilted flower',
    actual: '"bro… that was tragic"',
    example: 'he waved back at someone who wasn’t waving at him 🥀',
    translation: '“He waved back at someone who wasn’t waving at him. Tragic.”',
  },
]

export interface AuraScenario {
  id: string
  scenario: string
  value: number | 'deleted'
  label: string
}

export const AURA_SCENARIOS: AuraScenario[] = [
  {
    id: 'skibidi-dinner',
    scenario: 'Dad says “skibidi rizz” at the dinner table.',
    value: -8000,
    label: '-8000 AURA',
  },
  {
    id: 'quiet-understanding',
    scenario: 'Understands what “bro 😭” means but doesn’t say it himself.',
    value: 5000,
    label: '+5000 AURA',
  },
  {
    id: 'fellow-kids',
    scenario: 'Says “hello fellow kids”.',
    value: 'deleted',
    label: 'AURA: DELETED',
  },
  {
    id: 'catches-phone',
    scenario: 'Catches the falling phone before it hits the floor. Says nothing.',
    value: 1000,
    label: '+1000 AURA',
  },
  {
    id: 'wifi-fix',
    scenario: 'Fixes the WiFi by turning it off and on. Again.',
    value: 2500,
    label: '+2500 AURA',
  },
  {
    id: 'dab',
    scenario: 'Dabs at the school pickup. In front of the friends.',
    value: -6000,
    label: '-6000 AURA',
  },
]

export interface GenerationChain {
  human: string
  millennial: string
  genz: string
  alpha: string
}

export const GENERATION_CHAINS: GenerationChain[] = [
  { human: '“That’s funny.”', millennial: 'LOL', genz: 'I’m dead 💀', alpha: 'bro 😭' },
  { human: '“This is bad.”', millennial: 'that sucks', genz: 'we’re fucked', alpha: 'we’re cooked 😭' },
  { human: '“I agree completely.”', millennial: 'so true', genz: 'fr fr', alpha: 'real 😭🙏' },
]

export const RANDOM_BRAINROT: { slang: string; translation: string }[] = [
  { slang: 'bro is cooked 😭🙏', translation: '“Bro is done for, I can’t, please.”' },
  { slang: 'ts pmo fr fr 💀', translation: '“This pisses me off, for real, I died.”' },
  { slang: 'nahhh bro got mogged 🥀', translation: '“Nooo, bro got outclassed. Tragic.”' },
  { slang: 'yaa 😭 math exam tomorrow, we’re cooked', translation: '“Yeaaah, math exam tomorrow, we’re done for.”' },
  { slang: 'what is bro yapping about 💀', translation: '“What is he even talking about? I died.”' },
  { slang: 'she ate that, face card never declines', translation: '“She crushed it, the looks always work.”' },
  { slang: 'dad said skibidi at dinner, -8000 aura', translation: '“Dad said skibidi at dinner, -8000 aura.”' },
  { slang: 'ong istg i didn’t do it gng 🙏', translation: '“I swear, I swear, it wasn’t me, fam, please.”' },
  { slang: 'that take is diabolical, crazy work 😭', translation: '“That take is diabolical, unbelievable.”' },
  { slang: 'bro is tweaking rn, go touch grass', translation: '“Bro is acting unhinged, go outside.”' },
  { slang: 'that’s so ohio, fanum tax my fries 💀', translation: '“That’s so weird, stop stealing my fries.”' },
  { slang: 'i’m locked in fr, no cap', translation: '“I’m fully focused, seriously, no lie.”' },
]

export const SAFETY_LISTS: { tier: 'safe' | 'caution' | 'dont'; terms: string[] }[] = [
  { tier: 'safe', terms: ['valid', 'mid', 'W', 'L', 'tea', 'rn', 'mb', 'lmk', 'dam', 'salty', 'wild', 'diabolical', 'real', 'bet', 'lowkey', 'highkey', 'locked in', 'ghosted', 'left on read', 'soft launch', 'ship', 'understood the assignment', 'tbh'] },
  { tier: 'caution', terms: ['bro', 'bruh', 'fr', 'ngl', 'cooked', 'rizz', 'aura', 'yapping', 'slay', 'ate', '💀', '😭', '🙏', 'no cap', 'deadass', 'say less', 'chat', 'big yikes', 'sending me', 'delulu', 'fumbled', 'caught in 4k', 'let him cook', 'drip', 'goated', 'stan', 'sus', 'bussin', 'smh', 'wyd', 'hmu', 'finna'] },
  { tier: 'dont', terms: ['skibidi', 'sigma', '6-7', 'ts', 'pmo', 'mogged', 'chopped', 'goofy ahh', 'skibidi rizz', 'glazing', 'simp', 'unc', 'mewing', 'looksmaxxing', 'ohio', 'fanum tax', '41', 'gigachad', 'gyatt'] },
]


export interface TranslatorExample {
  input: string
  output: string
  context: string
}

export const TRANSLATOR_EXAMPLES: TranslatorExample[] = [
  {
    input: 'bro ts pmo 😭🙏',
    output: 'This is seriously pissing him off — with maximum drama.',
    context: 'An emotion. Used when something (homework, WiFi, life) crosses the line. 😭🙏 is theatrical despair, not crying.',
  },
  {
    input: 'she ate and left no crumbs',
    output: 'She did it perfectly. Flawlessly. Nobody can top it.',
    context: 'Praise for a performance, an outfit or a comeback — from dance floors to TikTok comments.',
  },
  {
    input: 'it’s giving main character',
    output: 'It radiates confident, cinematic energy.',
    context: 'A description. “It’s giving ___” works for any vibe: “it’s giving divorced dad” is not a compliment.',
  },
  {
    input: 'bro got caught in 4k',
    output: 'Busted, with crystal-clear proof. No way out.',
    context: 'A social reaction when screenshots or photos exist. Said with a grin.',
  },
  {
    input: 'no cap, that test was diabolical',
    output: 'No lie — the test was truly evil.',
    context: '“Cap” = a lie, “no cap” = the truth. Add “diabolical” when something is impressively brutal.',
  },
  {
    input: 'he fumbled her 🥀',
    output: 'He had his chance with her and blew it.',
    context: 'Group dynamics. 🥀 marks a quiet tragedy; expect the friend group to bring it up forever.',
  },
  {
    input: 'i’m delulu and that’s the solulu',
    output: 'I’m choosing unrealistic optimism on purpose.',
    context: 'A coping mechanism. Declaring yourself “delulu” means you know it’s unrealistic and you’re doing it anyway.',
  },
  {
    input: 'go touch grass 💀',
    output: 'You are way too online. Step outside. Now.',
    context: 'A group-chat verdict when someone’s take could only come from 14 hours of scrolling.',
  },
]

export const NAV_LINKS = [
  { href: '#translator', label: 'TRANSLATOR' },
  { href: '#emoji', label: 'EMOJI' },
  { href: '#dictionary', label: 'DICTIONARY' },
  { href: '#aura', label: 'AURA CHECK' },
  { href: '#generations', label: 'GENERATIONS' },
  { href: '#quiz', label: 'QUIZ' },
]
