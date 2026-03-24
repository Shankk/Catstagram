import { useEnsureAuth } from "../../hooks/useEnsureAuth";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children }) {
    const { user, loading } = useEnsureAuth();

    if(loading) return <p>Loading...</p>;
    if(!user) return <Navigate to="/log-in"></Navigate>;

    return children;
}