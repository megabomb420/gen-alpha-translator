import Nav from '../sections/Nav'
import Hero from '../sections/Hero'
import Translator from '../sections/Translator'
import EmojiShift from '../sections/EmojiShift'
import Dictionary from '../sections/Dictionary'
import RandomSlang from '../sections/RandomSlang'
import AuraMeter from '../sections/AuraMeter'
import SafetyGuide from '../sections/SafetyGuide'
import Generations from '../sections/Generations'
import Quiz from '../sections/Quiz'
import Footer from '../sections/Footer'
import { Marquee } from '../components/ui-kit'

export default function Home() {
  return (
    <div className="grain relative min-h-screen">
      <a
        href="#translator"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:font-mono2 focus:text-xs focus:font-bold focus:text-black"
      >
        Skip to translator
      </a>
      <Nav />
      <main>
        <Hero />
        <Marquee
          items={['fr fr', 'ong', 'no cap', 'mid', 'rizz', 'cooked', 'aura', 'valid', 'slay', 'sigma']}
          className="font-mono2 border-y border-line py-4 text-sm uppercase tracking-[0.3em] text-faint"
        />
        <Translator />
        <EmojiShift />
        <Marquee
          slow
          items={['😭', '💀', '🙏', '🥀', '😭', '💀', '🙏', '🥀']}
          separator=""
          className="border-y border-line py-6 text-5xl md:text-6xl"
        />
        <Dictionary />
        <RandomSlang />
        <AuraMeter />
        <SafetyGuide />
        <Generations />
        <Quiz />
      </main>
      <Footer />
    </div>
  )
}
