import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Portfolio = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const res = await api.get('/portfolio');
                setItems(res.data);
            } catch (err) {
                console.error('Failed to fetch portfolio', err);
                // Fallback data
                setItems([
                    { id: 1, title: 'Summer Wedding', image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'Wedding' },
                    { id: 2, title: 'Urban Portrait', image_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'Portrait' },
                    { id: 3, title: 'Corporate Event', image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'Event' },
                    { id: 4, title: 'Beach Wedding', image_url: 'https://images.unsplash.com/photo-1546193430-c2d207739ed7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'Wedding' },
                    { id: 5, title: 'Studio Session', image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'Portrait' },
                    { id: 6, title: 'Nature Shot', image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'Keywords' }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchPortfolio();
    }, []);

    if (loading) return <div className="text-center py-20">Loading portfolio...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Our Portfolio</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div key={item.id} className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer">
                        <img
                            src={item.image_url}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                            <h3 className="text-xl font-bold">{item.title}</h3>
                            <p className="text-sm uppercase tracking-wider mt-2">{item.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;
