import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Verify token by decoding or hitting a /me endpoint (not implemented yet, so simple check)
                    // Ideally we'd have a /auth/me endpoint. For now, rely on stored user or just token presence + decode in real app
                    // I will decode the token roughly or just persist user in localStorage for simplicity for this demo
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    }
                } catch (error) {
                    console.error(error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        return res.data.user;
    };

    const register = async (name, email, password) => {
        await api.post('/auth/register', { name, email, password });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
