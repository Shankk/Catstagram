import { Outlet } from "react-router-dom";
import { useUser } from '../../hooks/useUser';
import  '../style/Homepage.css';
import { Footer, Header } from "./Home";

export default function Layout() {
    const {user, setUser, loading } = useUser();

    if(loading) {
        return <div>Loading...</div>
    }

    if(!user) return null;

    return (
        <div className='page'>
           
            <Header></Header>
            
            <main className="content">
                <Outlet></Outlet>
            </main>

            <div className='side-footer'>
                {/* <Footer></Footer> */}
            </div>
        </div>
    )
}