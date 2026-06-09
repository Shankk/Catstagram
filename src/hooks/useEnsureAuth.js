import { useEffect, useState } from "react";
import { fetchUserSession } from "../services/authService";


export function useEnsureAuth() {
    const [isAuthed, setAuth ] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkUserSession() {
            try {
              const sessionUser = await fetchUserSession();
                console.log("isUserAuthed?: ", sessionUser?.authenticated);
                setAuth(sessionUser?.authenticated || false);  
            } catch (error) {
                setAuth(false);
            } finally {
              setLoading(false);  
            }
        }

        checkUserSession();
    }, []);

    return { isAuthed , loading};
}