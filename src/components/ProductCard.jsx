export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-purple-500/40 transition">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold">{product.title}</h3>
          <span className="text-purple-400 font-bold">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-white/60 text-sm mt-1">{product.character}</p>
        <div className="flex gap-2 mt-3">
          {product.colors?.map((c) => (
            <span key={c} className={`w-4 h-4 rounded-full border border-white/20 ${c === 'black' ? 'bg-black' : c === 'white' ? 'bg-white' : 'bg-purple-600'}`} />
          ))}
        </div>
        <button onClick={() => onAdd(product)} className="mt-4 w-full px-4 py-2 rounded-xl bg-white text-black hover:bg-purple-600 hover:text-white transition">
          Add to cart
        </button>
      </div>
    </div>
  )
}
