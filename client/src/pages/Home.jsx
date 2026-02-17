import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center bg-neutral-900 text-white rounded-3xl overflow-hidden">
                <div className="relative h-[80vh] flex items-center justify-center">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                            alt="Hero Background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>
                    <div className="relative z-10 text-center text-white px-4">
                        <h1
                            className="text-5xl md:text-7xl font-bold mb-6"
                        >
                            Turn Your Moments<br />Into Masterpieces
                        </h1>
                        <p
                            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
                        >
                            Professional photography services in Cauayan City, Isabela. Now offering Same-Day Edit & Photobooth.
                        </p>
                        <div>
                            <Link to="/booking" className="bg-white text-neutral-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-neutral-100 transition-colors">
                                Book a Session
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Preview */}
            <section className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'Weddings', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', desc: 'Capturing your special day with elegance and emotion.' },
                        { title: 'Portraits', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', desc: 'Professional headshots and artistic portraits.' },
                        { title: 'Events', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', desc: 'Documenting corporate events and private parties.' }
                    ].map((service, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-xl h-96 cursor-pointer">
                            <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                                <p className="text-neutral-300">{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
