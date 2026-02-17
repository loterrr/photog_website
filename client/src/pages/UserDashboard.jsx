import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        if (user) {
            const fetchBookings = async () => {
                try {
                    const res = await api.get('/bookings');
                    setBookings(res.data);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchBookings();
        }
    }, [user]);

    if (loading || !user) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

            {bookings.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-xl shadow-sm border border-neutral-100">
                    <p className="text-neutral-500">You haven't made any bookings yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <h3 className="text-xl font-bold text-neutral-900">{booking.Service?.name}</h3>
                                <p className="text-neutral-600">{new Date(booking.date).toLocaleDateString()} at {new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                {booking.notes && <p className="text-sm text-neutral-500 mt-2">Note: {booking.notes}</p>}
                            </div>
                            <div className="mt-4 md:mt-0">
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full 
                  ${booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-neutral-100 text-neutral-800'}`}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
