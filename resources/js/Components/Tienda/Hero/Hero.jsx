import { Link } from '@inertiajs/react';

export default function Hero() {
    return (
        <div className="relative bg-gradient-to-r from-purple-600 to-blue-500">
            <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                    Descubre lo último en moda
                </h1>
                <p className="mt-4 text-xl text-purple-100 max-w-3xl mx-auto">
                    Encuentra las mejores marcas y tendencias a precios increíbles
                </p>
                <div className="mt-8">
                    <Link href="#productos" className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-transform transform hover:scale-105">
                        Explorar Colección
                    </Link>
                </div>
            </div>
        </div>
    );
}