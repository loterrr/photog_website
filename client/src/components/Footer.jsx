import React from 'react';
import { Camera, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-neutral-200 py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <Camera className="h-6 w-6" />
                        <span className="font-bold text-lg">En-En's Photography</span>
                    </div>
                    <div className="text-sm text-neutral-400">
                        © {new Date().getFullYear()} En-En's Photography. All rights reserved.
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-neutral-500 hover:text-neutral-900 transition-colors"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="text-neutral-500 hover:text-neutral-900 transition-colors"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="text-neutral-500 hover:text-neutral-900 transition-colors"><Facebook className="w-5 h-5" /></a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
