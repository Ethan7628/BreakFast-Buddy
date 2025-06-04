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
                                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
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

// src/components/Layout.tsx
// import { useState, useEffect } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../firebase';
// import { signOut } from 'firebase/auth';
// import { Link } from 'react-router-dom';
//  // We'll update this

// export const Layout = () => {
//     const [user] = useAuthState(auth);
//     const [isMobile, setIsMobile] = useState(false);
//     const [menuOpen, setMenuOpen] = useState(false);

//     const handleLogout = () => {
//         signOut(auth);
//         setMenuOpen(false);
//     };

//     useEffect(() => {
//         const checkScreenSize = () => {
//             setIsMobile(window.innerWidth <= 870);
//         };

//         // Check on mount and on resize
//         checkScreenSize();
//         window.addEventListener('resize', checkScreenSize);

//         return () => window.removeEventListener('resize', checkScreenSize);
//     }, []);

//     return (
//         <>
//             <header className="header">
//                 <div className="container header-container">
//                     <Link to="/" className="logo">
//                         Breakfast Buddy
//                     </Link>

//                     {isMobile ? (
//                         <>
//                             <button
//                                 className={`hamburger ${menuOpen ? 'open' : ''}`}
//                                 onClick={() => setMenuOpen(!menuOpen)}
//                                 aria-label="Menu"
//                             >
//                                 <span></span>
//                                 <span></span>
//                                 <span></span>
//                             </button>

//                             <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
//                                 <nav className="nav-links">
//                                     {user ? (
//                                         <>
//                                             <Link to="/preferences" onClick={() => setMenuOpen(false)}>Preferences</Link>
//                                             <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
//                                             <button onClick={handleLogout}>Logout</button>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
//                                             <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
//                                         </>
//                                     )}
//                                 </nav>
//                             </div>
//                         </>
//                     ) : (
//                         <nav className="nav-links">
//                             {user ? (
//                                 <>
//                                     <Link to="/preferences">Preferences</Link>
//                                     <Link to="/dashboard">Dashboard</Link>
//                                     <button onClick={handleLogout}>Logout</button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <Link to="/login">Login</Link>
//                                     <Link to="/signup">Sign Up</Link>
//                                 </>
//                             )}
//                         </nav>
//                     )}
//                 </div>
//             </header>
//             <main className="container main-content">
//                 <Outlet />
//             </main>
//         </>
//     );
// };