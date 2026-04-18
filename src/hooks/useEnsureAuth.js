import { useEffect, useState } from "react";
import { fetchUserSession } from "../services/authService";


export function useEnsureAuth() {
    const [isAuthed, setAuth ] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkUserSession() {
            const sessionUser = await fetchUserSession();
            console.log("EnsureAuth Data: ", sessionUser);
            setAuth(sessionUser?.authenticated || false);
            setLoading(false);
        }

        checkUserSession();
    }, []);

    return { isAuthed , loading};
}