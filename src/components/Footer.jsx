export default function Footer() {
  return (
    <footer id="contact" className="mt-24 border-t border-white/10 bg-black/40">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-white/70">
        <div>
          <h4 className="text-white font-semibold">ANIMA FIT</h4>
          <p className="mt-2 text-sm">Anime-inspired outfits shipped worldwide. Black • White • Purple aesthetics.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold">Support</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Shipping & Returns</li>
            <li>Size Guide</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold">Contact</h4>
          <p className="mt-2 text-sm">support@animafit.shop</p>
        </div>
      </div>
      <div className="text-center text-white/50 text-sm py-4 border-t border-white/5">© {new Date().getFullYear()} Anima Fit</div>
    </footer>
  )
}
