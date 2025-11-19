import { ShoppingCart, Menu } from 'lucide-react'

export default function Navbar({ cartCount, onCartClick }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-white" />
          <span className="text-white font-bold tracking-wide">ANIMA FIT</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-white/80">
          <a href="#collection" className="hover:text-white">Collection</a>
          <a href="#about" className="hover:text-white">About</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="md:hidden text-white/80">
            <Menu className="w-6 h-6" />
          </button>
          <button onClick={onCartClick} className="relative text-white">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-purple-600 text-white rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
