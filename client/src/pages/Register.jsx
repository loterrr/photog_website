import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-neutral-100">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                    <input
                        type="email"
                        required
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
                    <input
                        type="password"
                        required
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-neutral-900 text-white py-2 rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
                >
                    Register
                </button>
            </form>
            <div className="mt-4 text-center text-sm text-neutral-600">
                Already have an account? <Link to="/login" className="text-neutral-900 font-semibold hover:underline">Login</Link>
            </div>
        </div>
    );
};

export default Register;
