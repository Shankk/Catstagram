import { createContext, useState, useEffect } from "react";
import { fetchUserBasic } from "../../services/authService";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUserBasic() {
            const userBasic = await fetchUserBasic();
            setUser(userBasic);
            setLoading(false);
        }

        getUserBasic();
    }, [])

    return (
        <UserContext.Provider value={{user, setUser, loading}}>
            {children}
        </UserContext.Provider>
    );
};