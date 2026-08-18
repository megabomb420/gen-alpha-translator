export interface QuizQuestion {
  phrase: string
  options: string[]
  correct: number
  note: string
}

export const QUIZ: QuizQuestion[] = [
  {
    phrase: 'bro ts pmo 😭🙏',
    options: [
      'He’s asking for the time in Tokyo',
      'Something is seriously pissing him off',
      'He’s praying because he’s sad',
    ],
    correct: 1,
    note: 'ts = this, pmo = pisses me off, 😭🙏 = dramatic suffering, not crying.',
  },
  {
    phrase: 'she ate and left no crumbs',
    options: ['She finished her lunch', 'She made a huge mess', 'She did it perfectly'],
    correct: 2,
    note: 'To “eat” = to perform flawlessly. No crumbs = nobody can top it.',
  },
  {
    phrase: 'bro got caught in 4k',
    options: ['Busted with crystal-clear evidence', 'He bought a new TV', 'He’s a fast runner'],
    correct: 0,
    note: '4K = high definition. The receipts are in Ultra HD. No escape.',
  },
  {
    phrase: '-5000 aura',
    options: ['He lost money', 'He embarrassed himself publicly', 'He’s feeling cold'],
    correct: 1,
    note: 'Aura is invisible coolness currency. Tripping in public costs thousands.',
  },
  {
    phrase: 'delulu is the solulu',
    options: ['A rare skin condition', 'A skincare brand', 'Being delusional is the solution'],
    correct: 2,
    note: 'Delusional optimism as a lifestyle choice. Mostly about crushes.',
  },
  {
    phrase: 'dad said “skibidi rizz” at dinner',
    options: ['A catastrophic aura event', 'A new recipe', 'A heartfelt compliment'],
    correct: 0,
    note: 'This is the correct answer and also a cry for help.',
  },
  {
    phrase: 'i’m locked in fr',
    options: ['He’s stuck in a room', 'He’s fully focused, for real', 'He’s in jail'],
    correct: 1,
    note: 'Locked in = maximum concentration. Hoodie up, phone down.',
  },
  {
    phrase: 'she soft launched her bf',
    options: ['She subtly revealed him online', 'She threw him gently', 'She beta-tested him'],
    correct: 0,
    note: 'A mysterious hand, two plates of food. Dating, but cryptic.',
  },
]

export function rankFor(score: number, total: number): { title: string; desc: string } {
  const p = score / total
  if (p === 1)
    return { title: 'CERTIFIED AURA', desc: 'Suspiciously fluent. Teach a seminar. Do not speak the language at dinner.' }
  if (p >= 0.75)
    return { title: 'DANGEROUSLY COMPETENT', desc: 'You understand almost everything. Your child senses this and is evolving.' }
  if (p >= 0.5)
    return { title: 'GETTING THERE', desc: 'Half fluent. Enough to know when they’re talking about you.' }
  if (p >= 0.25)
    return { title: 'BASELINE PARENT', desc: 'You caught a few. The rest remains a mystery, as nature intended.' }
  return { title: 'UNC STATUS', desc: 'You are the unc now. Accept it. Hydrate. Your knees hurt for a reason.' }
}
