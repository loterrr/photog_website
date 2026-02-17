import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Booking = () => {
    const [searchParams] = useSearchParams();
    const serviceIdParam = searchParams.get('serviceId');
    const navigate = useNavigate();
    const { user } = useAuth();

    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(serviceIdParam || '');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await api.get('/services');
                setServices(res.data);
            } catch (err) {
                console.error('Failed to fetch services', err);
                // Fallback
                setServices([
                    { id: 1, name: 'Wedding Package', price: 2500 },
                    { id: 2, name: 'Portrait Session', price: 300 },
                    { id: 3, name: 'Event Coverage', price: 200 }
                ]);
            }
        };
        fetchServices();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const dateTime = new Date(`${date}T${time}`);
            await api.post('/bookings', {
                serviceId: selectedService,
                date: dateTime,
                notes
            });
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Booking failed');
        }
    };

    if (success) {
        return (
            <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-md text-center">
                <h2 className="text-2xl font-bold mb-4 text-green-600">Booking Requested!</h2>
                <p className="text-neutral-600 mb-6">Your booking request has been sent via email (simulated). We will confirm your slot shortly.</p>
                <button onClick={() => navigate('/')} className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800">
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-md border border-neutral-100">
            <h1 className="text-3xl font-bold mb-8 text-center">Book a Session</h1>
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Select Service</label>
                    <select
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        required
                    >
                        <option value="">-- Choose a Package --</option>
                        {services.map(s => (
                            <option key={s.id} value={s.id}>{s.name} - ${s.price}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Date</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Time</label>
                        <input
                            type="time"
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Notes / Special Requests</label>
                    <textarea
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none h-32"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Tell us about your event, location preference, etc."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-neutral-900 text-white py-3 rounded-lg font-bold text-lg hover:bg-neutral-800 transition-colors"
                >
                    Confirm Booking
                </button>
            </form>
        </div>
    );
};

export default Booking;
