import {createContext, useState, useContext, useEffect} from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) return null;

        try {
            const decoded = jwtDecode(storedToken);
            const isExpired = decoded.exp * 1000 < Date.now();
            return isExpired ? null : storedToken;
        } catch {
            return null;
        }
    });

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null)
    };


    useEffect(() => {
        const syncAuth = () => {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) return setToken(null);

            try {
                const decoded = jwtDecode(storedToken);
                const isExpired = decoded.exp * 1000 < Date.now();
                setToken(isExpired ? null : storedToken);
            } catch {
                setToken(null);
            }
        };

        window.addEventListener('storage', syncAuth);
        return () => window.removeEventListener('storage', syncAuth);
    }, []);

    return (
        <AuthContext.Provider value={{ token, isLoggedIn: Boolean(token), login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}