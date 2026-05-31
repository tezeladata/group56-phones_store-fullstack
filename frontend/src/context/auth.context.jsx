import { createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = import.meta.env.VITE_API_URL + "/api";

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const autoLogin = async () => {
            const res = await fetch(`${API_URL}/auth/auto-login`, {
                method: "POST",
                credentials: "include"
            });

            const result = await res.json();

            if (result.status !== "fail") {
                setUser(result);
                navigate("/phones")
            }
        }

        autoLogin()
    }, [])

    const signUser = async (formData) => {
        try {
            const res = await fetch(`${API_URL}/auth/signUp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            };

            navigate("/logIn")
        } catch(err) {
            console.log(err);
        }
    };

    const logUser = async (formData) => {
        try {
            const res = await fetch(`${API_URL}/auth/logIn`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
                credentials: "include"
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            };

            setUser(result);

            navigate("/")
        } catch(err) {
            console.log(err);
        }
    };

    const logOutUser = async () => {
        try {
            const res = await fetch(`${API_URL}/auth/logout`, {
                method: "GET",
                credentials: "include"
            });

            if (!res.ok) {
                throw new Error("User not logged out!")
            };

            setUser(null);
            navigate("/logIn", {replace: true})
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider value={{ signUser, logUser, logOutUser, user }}>
            {children}
        </AuthContext.Provider>
    )
}