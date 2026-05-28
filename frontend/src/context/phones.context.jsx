import { createContext, useContext, useEffect, useState } from "react";

const PhonesContext = createContext();
export const usePhones = () => useContext(PhonesContext);

const API_URL = import.meta.env.VITE_API_URL + "/api";

export const PhonesProvider = ({children}) => {
    const [phones, setPhones] = useState([]);

    const getPhones = async () => {
        try {
            const res = await fetch(`${API_URL}/phones`);

            if (!res.ok) {
                throw new Error("Something went wrong!")
            };

            const result = await res.json();
            setPhones(result);
        } catch(err) {
            console.log(err);
        }
    };

    const deletePhone = async (id) => {
        try {
            const res = await fetch(`${API_URL}/phones/${id}`, {
                method: "DELETE",
                credentials: "include"
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.message);
            };

            setPhones(prev => prev.filter(phone => phone._id !== id));
        } catch(err) {
            console.log(err);
        }
    };

    const updatePhone = async (id, formData) => {
        try {
            const res = await fetch(`${API_URL}/phones/${id}`, {
                method: "PUT",
                credentials: "include",
                body: formData
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            };

            const index = phones.findIndex(phone => phone._id === result._id);
            const copyPhones = [...phones];
            copyPhones[index] = result;
            setPhones(copyPhones);
        } catch(err) {
            console.log(err);
        }
    };

    const addPhone = async (formData) => {
        try {
            const res = await fetch(`${API_URL}/phones`, {
                method: "POST",
                body: formData,
                credentials: "include"
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            };

            setPhones(prev => [...prev, result]);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getPhones();
    }, []);

    return (
        <PhonesContext.Provider value={{phones, deletePhone, updatePhone, addPhone}}>
            {children}
        </PhonesContext.Provider>
    )
}