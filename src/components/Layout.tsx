import { Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import Logo from '../images/ChatGPT Image Jun 1, 2025, 04_11_23 PM.png';



export const Layout = () => {
    const [user] = useAuthState(auth);

    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <>

            <header className="header">
                <div className=" header-container">
                    <Link to="/" className="logo">
                        <img src={Logo} alt="BreakFast Buddy Logo" />
                    </Link>
                    <nav className="nav-links">
                        {user ? (
                            <>
                                <Link to="/preferences">Preferences</Link>
                                <Link to="/dashboard">Dashboard</Link>
                                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Sign Up</Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>
            <main className="container">
                <Outlet />
            </main>
            <footer className="footer">

                <p >Ethan Kusasirakwe 2025 &copy;</p>

            </footer>

        </>
    );
};
