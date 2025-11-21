import { useState, useEffect } from 'react';
import { api } from '../services/api';

const useAuth = () => {
    // For development: bypass server auth and provide a demo user
    const [user, setUser] = useState({ id: 'dev-user', name: 'Demo User' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (_credentials) => {
        // simulate login without calling backend
        setUser({ id: 'dev-user', name: 'Demo User' });
        setLoading(false);
    };

    const logout = async () => {
        setUser(null);
    };

    return { user, loading, error, login, logout };
};

export default useAuth;