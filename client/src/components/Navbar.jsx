import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <Camera className="h-8 w-8 text-neutral-900" />
                        <span className="text-xl font-bold tracking-tight">En-En's Photography</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/" className="text-neutral-600 hover:text-neutral-900 transition-colors">Home</Link>
                        <Link to="/about" className="text-neutral-600 hover:text-neutral-900 transition-colors">About</Link>
                        <Link to="/services" className="text-neutral-600 hover:text-neutral-900 transition-colors">Services</Link>
                        <Link to="/portfolio" className="text-neutral-600 hover:text-neutral-900 transition-colors">Portfolio</Link>
                        <Link to="/contact" className="text-neutral-600 hover:text-neutral-900 transition-colors">Contact</Link>
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                    className="text-neutral-600 hover:text-neutral-900 font-medium"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors">Login</Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-neutral-600 hover:text-neutral-900 focus:outline-none">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-neutral-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50">Home</Link>
                        <Link to="/about" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50">About</Link>
                        <Link to="/services" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50">Services</Link>
                        <Link to="/portfolio" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50">Portfolio</Link>
                        <Link to="/contact" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50">Contact</Link>
                        {user ? (
                            <>
                                <Link
                                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                    onClick={toggleMenu}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => { logout(); toggleMenu(); }}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" onClick={toggleMenu} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
