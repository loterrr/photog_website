import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [services, setServices] = useState([]);
    const [items, setItems] = useState([]);
    const [activeTab, setActiveTab] = useState('bookings');

    const [newService, setNewService] = useState({ name: '', description: '', price: '', duration: '', image_url: '' });
    const [newPortfolio, setNewPortfolio] = useState({ title: '', category: '', image_url: '' });

    useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchBookings();
            fetchServices();
            fetchPortfolio();
        }
    }, [user, activeTab]);

    const fetchBookings = async () => {
        try {
            const res = await api.get('/bookings');
            setBookings(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchServices = async () => {
        try {
            const res = await api.get('/services');
            setServices(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchPortfolio = async () => {
        try {
            const res = await api.get('/portfolio');
            setItems(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.put(`/bookings/${id}/status`, { status });
            fetchBookings();
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateService = async (e) => {
        e.preventDefault();
        try {
            await api.post('/services', newService);
            setNewService({ name: '', description: '', price: '', duration: '', image_url: '' });
            fetchServices();
            alert('Service created!');
        } catch (err) {
            console.error(err);
            alert('Failed to create service');
        }
    };

    const handleDeleteService = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/services/${id}`);
            fetchServices();
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreatePortfolio = async (e) => {
        e.preventDefault();
        try {
            await api.post('/portfolio', newPortfolio);
            setNewPortfolio({ title: '', category: '', image_url: '' });
            fetchPortfolio();
            alert('Item added!');
        } catch (err) {
            console.error(err);
            alert('Failed to add item');
        }
    };

    const handleDeletePortfolio = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/portfolio/${id}`);
            fetchPortfolio();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading || !user) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="min-h-screen bg-neutral-100">
            <nav className="bg-neutral-900 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold">Admin Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">

                            <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href = '/login'; }} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="flex border-b border-neutral-200 mb-8 overflow-x-auto">
                    <button
                        className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'bookings' ? 'border-b-2 border-neutral-900 text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
                        onClick={() => setActiveTab('bookings')}
                    >
                        Bookings
                    </button>
                    <button
                        className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'services' ? 'border-b-2 border-neutral-900 text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
                        onClick={() => setActiveTab('services')}
                    >
                        Services
                    </button>
                    <button
                        className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'portfolio' ? 'border-b-2 border-neutral-900 text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
                        onClick={() => setActiveTab('portfolio')}
                    >
                        Portfolio
                    </button>
                </div>

                {activeTab === 'bookings' && (
                    <div className="bg-white shadow overflow-hidden rounded-lg overflow-x-auto">
                        <table className="min-w-full divide-y divide-neutral-200">
                            <thead className="bg-neutral-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Client</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Service</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Notes</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-neutral-200">
                                {bookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">{booking.User?.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{booking.Service?.name || 'Deleted'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{new Date(booking.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-sm text-neutral-500 max-w-xs truncate" title={booking.notes}>{booking.notes || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            {booking.status === 'pending' && (
                                                <>
                                                    <button onClick={() => handleStatusUpdate(booking.id, 'approved')} className="text-green-600 hover:text-green-900">Approve</button>
                                                    <button onClick={() => handleStatusUpdate(booking.id, 'rejected')} className="text-red-600 hover:text-red-900">Reject</button>
                                                </>
                                            )}
                                            {booking.status === 'approved' && (
                                                <button onClick={() => handleStatusUpdate(booking.id, 'completed')} className="text-blue-600 hover:text-blue-900">Complete</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'services' && (
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
                            <h3 className="text-lg font-bold mb-4">Add New Service</h3>
                            <form onSubmit={handleCreateService} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input className="border p-2 rounded" placeholder="Name" value={newService.name} onChange={e => setNewService({ ...newService, name: e.target.value })} required />
                                <input className="border p-2 rounded" placeholder="Price" type="number" value={newService.price} onChange={e => setNewService({ ...newService, price: e.target.value })} required />
                                <input className="border p-2 rounded" placeholder="Duration (mins)" type="number" value={newService.duration} onChange={e => setNewService({ ...newService, duration: e.target.value })} required />
                                <input className="border p-2 rounded" placeholder="Image URL" value={newService.image_url} onChange={e => setNewService({ ...newService, image_url: e.target.value })} />
                                <textarea className="border p-2 rounded md:col-span-2" placeholder="Description" value={newService.description} onChange={e => setNewService({ ...newService, description: e.target.value })} />
                                <button type="submit" className="bg-neutral-900 text-white p-2 rounded md:col-span-2 hover:bg-neutral-800">Create Service</button>
                            </form>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map(service => (
                                <div key={service.id} className="bg-white border text-sm rounded-lg p-4 shadow-sm relative">
                                    <button onClick={() => handleDeleteService(service.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">Delete</button>
                                    <h3 className="font-bold pr-12 text-lg">{service.name}</h3>
                                    <p className="text-neutral-500 mb-2">${service.price} - {service.duration} mins</p>
                                    <p className="text-neutral-400 text-xs">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'portfolio' && (
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
                            <h3 className="text-lg font-bold mb-4">Add Portfolio Item</h3>
                            <form onSubmit={handleCreatePortfolio} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input className="border p-2 rounded" placeholder="Title" value={newPortfolio.title} onChange={e => setNewPortfolio({ ...newPortfolio, title: e.target.value })} required />
                                <input className="border p-2 rounded" placeholder="Category" value={newPortfolio.category} onChange={e => setNewPortfolio({ ...newPortfolio, category: e.target.value })} />
                                <input className="border p-2 rounded" placeholder="Image URL" value={newPortfolio.image_url} onChange={e => setNewPortfolio({ ...newPortfolio, image_url: e.target.value })} required />
                                <button type="submit" className="bg-neutral-900 text-white p-2 rounded md:col-span-3 hover:bg-neutral-800">Add Item</button>
                            </form>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {items.map(item => (
                                <div key={item.id} className="relative group">
                                    <img src={item.image_url} alt={item.title} className="w-full h-32 object-cover rounded-lg" />
                                    <button onClick={() => handleDeletePortfolio(item.id)} className="absolute top-1 right-1 bg-white rounded-full p-1 shadow text-red-500 hover:bg-neutral-100">
                                        X
                                    </button>
                                    <p className="text-sm mt-1 font-semibold">{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
