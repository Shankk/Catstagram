import { useEffect, useState } from "react";
import { fetchUserSession } from "../services/authService";


export function useEnsureAuth() {
    const [isAuthed, setAuth ] = useState(false);
    //const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            const sessionUser = await fetchUserSession();
            //console.log("EnsureAuth Data: ", sessionUser);
            setAuth(sessionUser?.authenticated || false);
            setLoading(false);
        }

        loadUser();
    }, []);

    return { isAuthed , loading};
}