// Componente ProductCard actualizado
export default function ProductCard({ product, onViewDetails, onAddToCart }) {
    return (
        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-t-xl"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                    <button
                        onClick={() => onViewDetails(product)}
                        className="bg-white/90 px-3 py-1 rounded-full text-sm hover:bg-white transition"
                    >
                        👁️ Ver detalles
                    </button>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        ⚡ Envío gratis
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span>{product.rating}</span>
                    </div>
                </div>

                <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                    {product.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <span className="text-2xl font-bold text-purple-600">
                            S./ {product.price}
                        </span>
                        <span className="ml-2 text-sm text-gray-500 line-through">
                        S./ {(product.price * 1.2).toFixed(2)}
                        </span>
                    </div>
                    <button
                        onClick={() => onAddToCart(product)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
                    >
                        🛒 Añadir
                    </button>
                </div>
            </div>
        </div>
    );
}