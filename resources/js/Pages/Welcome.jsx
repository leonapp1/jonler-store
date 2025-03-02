import { Head, Link } from '@inertiajs/react';
import { useState, createContext, useContext } from 'react';

import Header from '../Components/Tienda/Header/Header';
import ProductGrid from '../Components/Tienda/ProductGrid/ProductGrid';

import Hero from '../Components/Tienda/Hero/Hero';
import Features from '../Components/Tienda/Features/Features';
import Footer from '../Components/Tienda/Footer/Footer';
import products from '../Data/productos.json';
// Contexto del carrito
const CartContext = createContext();

export default function Welcome({ auth }) {
    const [cartItems, setCartItems] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showCart, setShowCart] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedSize, setSelectedSize] = useState(null);

    // Extraer categorías únicas del JSON
    const categories = [...new Set(products.map(product => product.category))];

    // Filtrar productos
    const filteredProducts = selectedCategory === 'Todos'
        ? products
        : products.filter(product => product.category === selectedCategory);

    // Funciones del carrito
    const addToCart = (product, quantity = 1) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);

            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );

            }
            return [...prev, { ...product, quantity }];

        });

    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const StarIcon = ({ filled }) => (
        <svg
            className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
        >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    );

    const XMarkIcon = (props) => (
        <svg
            {...props}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    );

    const ShoppingBagIcon = (props) => (
        <svg
            {...props}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
        </svg>
    );

    const TruckIcon = (props) => (
        <svg
            {...props}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17H7v-6h10m4 0v6m-4-6V9m0 8h4m0 0h2M3 3h18a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1z"
            />
        </svg>
    );

    const ShieldCheckIcon = (props) => (
        <svg
            {...props}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    );
    return (

        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartTotal }}>
            <Head title="Jonler Shop" />
            {/* Interfaz principal */}
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Header
                    auth={auth}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    cartCount={cartItems.length}
                    toggleCart={() => setShowCart(!showCart)} />
                <Hero />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-12 text-center">
                        Productos Destacados
                    </h2>
                    <h2 className="text-2xl font-bold mb-6 dark:text-white">
                        {selectedCategory === 'Todos'
                            ? `Todos los productos (${products.length})`
                            : `${selectedCategory} (${filteredProducts.length})`}
                    </h2>
                    <ProductGrid
                        products={filteredProducts}
                        onViewDetails={setSelectedProduct}
                        onAddToCart={addToCart}
                    />
                </main>
                <Features />
                <Footer />

            </div>

            {/* Modal de producto */}
            {selectedProduct && (
                <div
                    role="dialog"
                    aria-labelledby="product-modal-title"
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
                >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all scale-[0.98] hover:scale-100">
                        <div className="flex justify-between items-start p-6 pb-4 border-b dark:border-gray-700">
                            <div className="pr-4">
                                <h3
                                    id="product-modal-title"
                                    className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                                >
                                    {selectedProduct.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-500 flex">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} filled={i < selectedProduct.rating} />
                                        ))}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                                        ({selectedProduct.reviews} reseñas)
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-transform transform hover:scale-110"
                                aria-label="Cerrar modal"
                            >
                                <XMarkIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                            </button>
                        </div>

                        <div className="overflow-y-auto max-h-[80vh]">
                            <div className="p-6">
                                <div className="relative group">
                                    <img
                                        src={selectedProduct.image}
                                        alt={selectedProduct.name}
                                        className="w-full h-64 object-contain rounded-lg bg-gray-50 dark:bg-gray-900 p-4 shadow-sm transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute top-2 right-2 bg-white dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                                        📌 {selectedProduct.category}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8 mt-6">
                                    <div>
                                        <div className="prose dark:prose-invert">
                                            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                                                {selectedProduct.details}
                                            </p>
                                        </div>

                                        <div className="mt-6">
                                            <h4 className="text-lg font-semibold mb-3">Tallas disponibles</h4>
                                            <div className="grid grid-cols-4 gap-2">
                                                {selectedProduct.sizes.map(size => (
                                                    <button
                                                        key={size}
                                                        className={`px-3 py-2 border-2 rounded-md text-sm font-medium transition-all
                                                ${selectedSize === size
                                                                ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300'
                                                                : 'border-gray-200 dark:border-gray-600 hover:border-purple-400 hover:text-purple-600 dark:hover:border-purple-500'}
                                                `}
                                                        onClick={() => setSelectedSize(size)}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-xl">
                                            <div className="flex items-end gap-2 mb-3">
                                                <span className="text-4xl font-bold text-purple-600">
                                                    ${selectedProduct.price}
                                                </span>
                                                {selectedProduct.oldPrice && (
                                                    <span className="text-gray-400 dark:text-gray-500 line-through">
                                                        ${selectedProduct.oldPrice}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-green-600 dark:text-green-400">
                                                ✅ Envío gratis en 24-48h
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                {selectedProduct.stock > 0
                                                    ? `🟢 ${selectedProduct.stock} unidades disponibles`
                                                    : "🔴 Agotado temporalmente"}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => {
                                                addToCart(selectedProduct);
                                                setSelectedProduct(null);
                                            }}
                                            disabled={selectedProduct.stock <= 0}
                                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                                        >
                                            <ShoppingBagIcon className="w-5 h-5" />
                                            <span className="font-semibold">Añadir al Carrito</span>
                                        </button>

                                        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                                            <p className="flex items-center gap-2">
                                                <TruckIcon className="w-5 h-5" />
                                                Devolución gratuita en 30 días
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <ShieldCheckIcon className="w-5 h-5" />
                                                Garantía del fabricante: 2 años
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Carrito lateral */}
            {showCart && (
                <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Tu Carrito</h2>
                        <button
                            onClick={() => setShowCart(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    {cartItems.length === 0 ? (
                        <p className="text-gray-500">Tu carrito está vacío</p>
                    ) : (
                        <>
                            <div className="space-y-4 overflow-y-auto max-h-[60vh]">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex gap-4 border-b pb-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-semibold">{item.name}</h4>
                                            <div className="flex items-center gap-4 mt-2">
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    min="1"
                                                    onChange={(e) => {
                                                        const newQuantity = parseInt(e.target.value);
                                                        setCartItems(prev =>
                                                            prev.map(cartItem =>
                                                                cartItem.id === item.id
                                                                    ? { ...cartItem, quantity: newQuantity }
                                                                    : cartItem
                                                            )
                                                        );
                                                    }}
                                                    className="w-16 px-2 py-1 border rounded"
                                                />
                                                <span className="text-purple-600">
                                                    S./ {(item.price * item.quantity).toFixed(2)}
                                                </span>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 border-t pt-4">
                                <div className="flex justify-between text-xl font-bold mb-4">
                                    <span>Total:</span>
                                    <span>S./{cartTotal.toFixed(2)}</span>
                                </div>
                                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
                                    Proceder al Pago
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </CartContext.Provider>
    );
}