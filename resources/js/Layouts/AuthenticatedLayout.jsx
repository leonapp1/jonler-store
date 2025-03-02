import ApplicationLogo from '@/Components/sistema/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsSidebarOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar Mobile Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${
                    isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 z-50 flex w-64 flex-col bg-gradient-to-b from-indigo-600 to-stone-700 shadow-xl transition-transform duration-300 md:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Logo */}
                <div className="flex h-20 items-center justify-center border-b border-white/10">
                    <Link href="/" className="flex items-center gap-3">
                        <ApplicationLogo className="h-8 w-8 text-white" />
                        <span className="text-xl font-bold text-white">Your Logo</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2 p-4">
                    <NavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        className="group flex items-center rounded-lg px-4 py-3 text-white transition-all hover:bg-white/10"
                    >
                        <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                    </NavLink>
                    
                    {/* Add more navigation items here */}
                </nav>

                {/* User Section */}
                <div className="border-t border-white/10 p-4">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                            <span className="font-medium text-white">{user.name[0]}</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-white/80">{user.email}</p>
                        </div>
                    </div>
                    
                    <ResponsiveNavLink
                        href={route('profile.edit')}
                        className="flex items-center rounded-lg px-4 py-2 text-sm text-white transition-all hover:bg-white/10"
                    >
                        <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Mi Perfil
                    </ResponsiveNavLink>
                    
                    <ResponsiveNavLink
                        method="post"
                        href={route('logout')}
                        as="button"
                        className="flex w-full items-center rounded-lg px-4 py-2 text-sm text-white transition-all hover:bg-white/10"
                    >
                        <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Cerrar Sesión
                    </ResponsiveNavLink>
                </div>
            </aside>

            {/* Main Content */}
            <div className="md:ml-72">
                {/* Mobile Header */}
                <header className="flex items-center justify-between bg-white p-4 shadow-md md:hidden">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <ApplicationLogo className="h-6 text-gray-800" />
                    <div className="w-6"></div>
                </header>

                {/* Page Content */}
                <main className="min-h-screen p-6">
                    {header && <h1 className="mb-6 text-3xl font-bold text-gray-800">{header}</h1>}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

// Custom NavLink component with active state
function NavLink({ active, className, children, ...props }) {
    return (
        <Link
            {...props}
            className={`${className} ${
                active ? 'bg-white/20 font-semibold' : 'font-medium'
            }`}
        >
            {children}
        </Link>
    );
}

// Custom ResponsiveNavLink component
function ResponsiveNavLink({ className, children, ...props }) {
    return (
        <Link
            {...props}
            className={`${className} focus:outline-none focus:ring-2 focus:ring-white/20`}
        >
            {children}
        </Link>
    );
}