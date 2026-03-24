import { useEffect, useState } from "react";
import { fetchUserSession } from "../services/authService";


export function useEnsureAuth() {
    const [user, setUser] = useState(null);
    //const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            const sessionUser = await fetchUserSession();
            setUser(sessionUser);
            //setLoading(false);
        }

        loadUser();
    }, []);

    return { user }; // loading
}