import { ShoppingBag } from 'lucide-react'

export default function Hero({ onExplore }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/30 to-slate-900" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-700/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-black/40 text-white/80 mb-6">
          <ShoppingBag className="w-4 h-4" />
          <span className="text-xs tracking-widest">DROPSHIPPING • WORLDWIDE</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
          Anime-Inspired Streetwear
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
          Minimal designs. Character energy. Built in black, white, and purple.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button onClick={onExplore} className="px-6 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition shadow-lg shadow-purple-600/30">
            Explore Collection
          </button>
          <a href="#about" className="px-6 py-3 rounded-xl border border-white/10 text-white/80 hover:text-white hover:border-white/30 transition">
            Why Us
          </a>
        </div>
      </div>
    </section>
  )
}
