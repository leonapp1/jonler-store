import { Link } from '@inertiajs/react';

export default function Navigation({ auth, cartCount, toggleCart }) {
    return (
        <div className="hidden md:flex items-center space-x-8">
            <Link 
                href="#productos" 
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"
            >
                Productos
            </Link>
            
            {/* Botón del Carrito */}
            <button 
                onClick={toggleCart}
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors flex items-center relative"
            >
                <svg 
                    className="w-6 h-6 mr-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
                Carrito
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {cartCount}
                    </span>
                )}
            </button>

            {/* Resto del código de autenticación */}
            {auth.user ? (
                <Link 
                    href={route('dashboard')} 
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"
                >
                    <svg 
                        className="w-5 h-5 mr-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                        />
                    </svg>
                    Perfil
                </Link>
            ) : (
                <div className="flex items-center space-x-4">
                    <Link 
                        href={route('login')} 
                        className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"
                    >
                        Ingresar
                    </Link>
                    <Link 
                        href={route('register')} 
                        className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
                    >
                        Registrarse
                    </Link>
                </div>
            )}
        </div>
    );
}