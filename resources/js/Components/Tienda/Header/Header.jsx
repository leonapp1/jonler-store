import { Link } from '@inertiajs/react';
import { useState } from 'react';
import Navigation from './Navigation';

export default function Header({ 
  auth, 
  cartCount, 
  toggleCart, 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="sticky top-0 bg-white dark:bg-gray-800 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Mejorado */}
          <Link href="/" className="flex items-center group">
            <div className="bg-purple-600 p-2 rounded-lg transform group-hover:rotate-12 transition-all duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="ml-3 text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300">
              Jonler Shop
            </span>
          </Link>

          {/* Menú Desktop */}
          <div className="hidden md:flex">
            <Navigation
              auth={auth}
              cartCount={cartCount}
              toggleCart={toggleCart}
            />
          </div>

          {/* Menú Mobile */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleCart}
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <svg className="w-7 h-7 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Selector de Categorías Desktop Mejorado */}
        <div className="hidden md:flex gap-3 mt-4 pb-4 border-b dark:border-gray-700">
          {['Todos', ...categories].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
                selectedCategory === category 
                ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg'
                : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 hover:shadow-md'
              }`}
            >
              <span className="font-medium tracking-wide">{category}</span>
            </button>
          ))}
        </div>

        {/* Menú Mobile Desplegable Mejorado */}
        {showMobileMenu && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white dark:bg-gray-800 shadow-xl py-4 animate-slideDown">
            <div className="px-4 space-y-4">
              <Link
                href="#productos"
                className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-gray-700 dark:text-gray-300 font-medium">Productos</span>
              </Link>

              {auth.user ? (
                <Link
                  href={route('dashboard')}
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Perfil</span>
                </Link>
              ) : (
                <div className="space-y-4">
                  <Link
                    href={route('login')}
                    className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Ingresar</span>
                  </Link>
                  <Link
                    href={route('register')}
                    className="block bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center p-3 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Registrarse
                  </Link>
                </div>
              )}

              <div className="border-t dark:border-gray-700 pt-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 px-3">Categorías</h3>
                <div className="relative">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setShowMobileMenu(false);
                    }}
                    className="w-full bg-gray-50 dark:bg-gray-700 rounded-lg pl-4 pr-8 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 dark:text-gray-300"
                  >
                    {['Todos', ...categories].map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}