import {createContext, useState, useContext, useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import toast from "react-hot-toast";

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
    const [loading, setLoading] = useState(true);

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        toast.success("Login succeeded");
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null)
    };

    useEffect(() => {
        const checkToken = () => {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                setToken(null);
                setLoading(false);
                return;
            }

            try {
                const decoded = jwtDecode(storedToken);
                const isExpired = decoded.exp * 1000 < Date.now();

                if (isExpired) {
                    localStorage.removeItem('token');
                    setToken(null);
                } else {
                    setToken(storedToken);
                }
            } catch {
                setToken(null);
            }

            setLoading(false);
        };

        checkToken();

        const syncAuth = () => {
            checkToken();
        };

        window.addEventListener('storage', syncAuth);
        return () => window.removeEventListener('storage', syncAuth);
    }, []);

    return (
        <AuthContext.Provider value={{ token, isLoggedIn: Boolean(token), login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}