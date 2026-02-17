import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // Fallback data if API fails (for demo purposes if backend isn't running)
                // In real execution, we'd handle error more gracefully
                const res = await api.get('/services');
                setServices(res.data);
            } catch (err) {
                console.error('Failed to fetch services', err);
                setServices([
                    { id: 1, name: 'Wedding Package', description: 'Full day coverage with 2 photographers.', price: 15000, duration: 0 },
                    { id: 2, name: 'Portrait Session', description: '1 hour on-location shoot.', price: 5000, duration: 60 },
                    { id: 3, name: 'Event Coverage', description: 'Hourly event photography.', price: 6000, duration: 60 }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (loading) return <div className="text-center py-20">Loading services...</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 pb-16">
            <h1 className="text-4xl font-bold mb-12 text-center mt-8">Our Photography Packages</h1>

            {Object.entries(services.reduce((acc, service) => {
                const category = service.category || 'Other Services';
                if (!acc[category]) acc[category] = [];
                acc[category].push(service);
                return acc;
            }, {})).map(([category, categoryServices]) => (
                <div key={category} className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-neutral-800 border-b pb-2">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categoryServices.map((service) => (
                            <div key={service.id} className="bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
                                <div className="h-48 bg-neutral-200 relative">
                                    {service.image_url ? (
                                        <img src={service.image_url} alt={service.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-neutral-400">No Image</div>
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                                    <p className="text-neutral-600 mb-6 text-sm flex-grow whitespace-pre-line">{service.description}</p>
                                    <div className="mt-auto pt-4 border-t border-neutral-100 flex justify-between items-center">
                                        <div>
                                            <span className="text-2xl font-bold text-neutral-900">₱{service.price?.toLocaleString()}</span>
                                            {service.duration > 0 && <span className="text-neutral-500 text-xs ml-1">/ {service.duration}m</span>}
                                        </div>
                                        <Link
                                            to={`/booking?serviceId=${service.id}`}
                                            className="px-5 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
                                        >
                                            Book
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {services.length === 0 && (
                <div className="text-center text-neutral-500 py-12">No services found.</div>
            )}
        </div>
    );
};

export default Services;
