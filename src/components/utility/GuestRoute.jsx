import { useEnsureAuth } from "../../hooks/useEnsureAuth";
import { Navigate } from "react-router-dom";


export default function GuestRoute({ children }) {
    const { isAuthed, loading } = useEnsureAuth();

    if(loading) return <p>Loading...</p>;
    
    if(isAuthed) return <Navigate to="/"></Navigate>;

    return children;
}