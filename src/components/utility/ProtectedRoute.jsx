import { useEnsureAuth } from "../../hooks/useEnsureAuth";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children }) {
    const { isAuthed, loading } = useEnsureAuth();

    if(loading) return <p>Loading...</p>;
    if(!isAuthed) return <Navigate to="/log-in"></Navigate>;
    //console.log("User is Authenticated! isAuthed: " , isAuthed)

    return children;
}