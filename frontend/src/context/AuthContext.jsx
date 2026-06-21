import { createContext, useContext, useEffect, useState } from "react";

import {
    loginUser,
    registerUser,
    logoutUser,
    getCurrentUser,
} from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await getCurrentUser();

                setUser(data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (userData) => {
        const data = await loginUser(userData);

        setUser(data.user);

        return data;
    };

    const register = async (userData) => {
        const data = await registerUser(userData);

        setUser(data.user);

        return data;
    };

    const logout = async () => {
        await logoutUser();

        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};