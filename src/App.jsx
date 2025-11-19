import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import Footer from './components/Footer'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [character, setCharacter] = useState('')
  const [color, setColor] = useState('')
  const [cart, setCart] = useState([])
  const collectionRef = useRef(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (query) params.set('q', query)
      if (character) params.set('character', character)
      if (color) params.set('color', color)
      const res = await fetch(`${API_URL}/api/products?${params.toString()}`)
      const data = await res.json()
      setProducts(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id)
      if (found) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p))
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
      <Navbar cartCount={cart.length} onCartClick={() => alert('Cart preview coming soon')} />
      <Hero onExplore={() => collectionRef.current?.scrollIntoView({ behavior: 'smooth' })} />

      <section id="collection" ref={collectionRef} className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Collection</h2>
            <p className="text-white/60 mt-1">Handpicked pieces channeling iconic characters</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchProducts()}
              placeholder="Search outfits"
              className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white placeholder-white/50"
            />
            <input
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchProducts()}
              placeholder="Character"
              className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white placeholder-white/50"
            />
            <select
              value={color}
              onChange={(e) => { setColor(e.target.value); fetchProducts() }}
              className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
            >
              <option value="">Any color</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="purple">Purple</option>
            </select>
            <button onClick={fetchProducts} className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500">Apply</button>
          </div>
        </div>

        {loading ? (
          <div className="text-white/70 mt-10">Loading products…</div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {products.map((p) => (
              <ProductCard key={p.id || p._id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}

        {/* Cart summary */}
        <div className="mt-12 bg-black/40 border border-white/10 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Cart</h3>
            <span className="text-purple-400 font-bold">${total.toFixed(2)}</span>
          </div>
          <div className="mt-4 space-y-2">
            {cart.length === 0 && <div className="text-white/60">Your cart is empty</div>}
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <img src={item.image} className="w-10 h-10 rounded object-cover" />
                  <div>
                    <div className="text-white">{item.title}</div>
                    <div className="text-white/60">x{item.qty}</div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-white/60 hover:text-white">Remove</button>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <button
              onClick={async () => {
                try {
                  const res = await fetch(`${API_URL}/api/orders`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      items: cart.map((c) => ({ product_id: c.id || c._id, quantity: c.qty })),
                      customer_name: 'Guest',
                      customer_email: 'guest@example.com',
                      customer_address: 'N/A',
                    }),
                  })
                  const data = await res.json()
                  alert('Order created: ' + data.id)
                  setCart([])
                } catch (e) {
                  alert('Failed to create order')
                }
              }}
              className="mt-6 w-full px-4 py-3 rounded-xl bg-white text-black hover:bg-purple-600 hover:text-white transition"
            >
              Checkout
            </button>
          )}
        </div>
      </section>

      <section id="about" className="max-w-6xl mx-auto px-6 py-16 text-white/80">
        <h3 className="text-2xl font-semibold text-white">Why shop with us</h3>
        <ul className="mt-4 grid md:grid-cols-3 gap-6">
          <li className="bg-black/40 border border-white/10 rounded-2xl p-6">Fast global shipping</li>
          <li className="bg-black/40 border border-white/10 rounded-2xl p-6">Secure checkout</li>
          <li className="bg-black/40 border border-white/10 rounded-2xl p-6">Character-inspired designs</li>
        </ul>
      </section>

      <Footer />
    </div>
  )
}
