import { createContext, useState, useEffect } from "react";
import { fetchUser } from "../../services/userService";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    async function getUser() {
        const userData = await fetchUser();
        setUser(userData);
        setLoading(false);
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getUser();
    }, [])

    return (
        <UserContext.Provider value={{user, setUser, loading, getUser}}>
            {children}
        </UserContext.Provider>
    );
};