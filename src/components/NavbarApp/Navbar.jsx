import SearchForm from "./components/searchForm";
import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router";
import supabase from "../../Supabase/Client";
import SessionContext from "../../context/SessionContext";
import { Toast } from 'primereact/toast';
import { Avatar } from "@mui/material";
import Genres from "../SidebarApp/components/genres";
import Platforms from "../SidebarApp/components/Platform";
import { Offcanvas } from 'bootstrap';


export default function Navbar() {
    const { session, user } = useContext(SessionContext);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const toast = useRef(null);
    const [avatar_url, setAvatarUrl] = useState(null);
    
    

    useEffect(() => {
        let ignore = false;
        async function getProfile() {
            if (!session || !session.user) return;
            const { user } = session;

            const { data, error } = await supabase
                .from("profiles")
                .select(`avatar_url`)
                .eq("id", user.id)
                .single();

            if (!ignore) {
                if (error) {
                    console.warn(error);
                } else if (data) {
                    setAvatarUrl(data.avatar_url);
                }
            }
        }

        getProfile();

        return () => {
            ignore = true;
        };
    }, [session]);

    const handleSearchSubmit = (query) => {
        if (!query) return;
        setSearchQuery(query);
        navigate(`/search?q=${query}`);
    };

    // LOGICA LOGOUT //
    const signOut = async () => {
        await supabase.auth.signOut();
        navigate("/");

        toast.current.show({
            severity: "success",
            summary: "Logout effettuato con successo",
            life: 3000,
        });

        await new Promise((resolve) => setTimeout(resolve, 500));
        navigate("/");
    };


    const closeOffcanvas = async (pathOrCallback) => {
        const offcanvasEl = document.getElementById("offcanvasMenu");
        const instance = Offcanvas.getInstance(offcanvasEl) || new Offcanvas(offcanvasEl);
        instance.hide();
    
        if (typeof pathOrCallback === "string") {
            navigate(pathOrCallback);
        } else if (typeof pathOrCallback === "function") {
            await pathOrCallback();
        }
    };
    

    const handleLogout = async () => {
        closeOffcanvas();  

        setAvatarUrl(null);

        await new Promise(resolve => setTimeout(resolve, 300)); 
        await signOut(); 
    };

    const handleOffcanvasToggle = () => {
        setIsOffcanvasOpen(!isOffcanvasOpen);  
      };



    return (
        <>
            <nav className="navbar navbar-expand-lg d-flex align-items-center">
                <div className="container-fluid">
                    <div className="d-flex align-items-center mx-auto w-100">
                        <a className="navbar-brand" href="/">Rehack</a>
                        <SearchForm onSubmit={handleSearchSubmit} />

                        
                        <button
                            className="navbar-toggler ms-3 border-0 d-lg-none d-flex align-items-center pe-0"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasMenu"
                            aria-controls="offcanvasMenu"
                        >
                            <Avatar
                                className="me-2"
                                src={`https://oiflwdvvdflmgcrxezuj.supabase.co/storage/v1/object/public/avatars/${avatar_url}`}
                            />
                            <i className="bi bi-chevron-down fs-6 c-text-white"></i>
                        </button>
                    </div>

                    
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto pos-mobile">
                            <li className="nav-item dropdown d-none d-lg-block">
                                <Link
                                    className="nav-link dropdown-toggle d-flex align-items-center"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                >
                                    {user ? <Avatar className="me-2" src={`https://oiflwdvvdflmgcrxezuj.supabase.co/storage/v1/object/public/avatars/${avatar_url}`} /> : "Account"}
                                </Link>
                                <ul className="dropdown-menu bg-darkGrey border-0">
                                    {session ? (
                                        <>
                                            <li><Link to="/Account" className="dropdown-item bg-transparent c-text-white">Dashboard</Link></li>
                                            <li><Link onClick={signOut} to="#" className="dropdown-item bg-transparent c-text-white">Logout</Link></li>
                                        </>
                                    ) : (
                                        <>
                                            <li><Link className="dropdown-item bg-transparent c-text-white" to="/login">Login</Link></li>
                                            <li><Link to="/register" className="dropdown-item bg-transparent c-text-white">Sign up</Link></li>
                                        </>
                                    )}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            
            <div
                className="offcanvas offcanvas-end bg-darkGrey"
                tabIndex="-1"
                id="offcanvasMenu"
                aria-labelledby="offcanvasMenuLabel"
            >
                <div className="offcanvas-header">
                    <Link
                        className="fs-5"
                        to="/"
                        onClick={() => closeOffcanvas("/")}
                    >
                        <i className="bi bi-house-door me-2"></i>Home
                    </Link>
                    <button
                        type="button"
                        className="btn-close text-reset c-text-white"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body pt-0 bg-darkGrey">

                    
                    {session ? (
                        <ul className="list-unstyled">
                            <li>
                                <Link
                                    to="/Account"
                                    className="dropdown-item bg-transparent c-text-white fs-5 mb-2"
                                    onClick={() => closeOffcanvas("/Account")}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item bg-transparent c-text-white fs-5"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Link>


                            </li>
                        </ul>
                    ) : (
                        <ul className="list-unstyled">
                            <li>
                                <Link
                                    to="/login"
                                    className="dropdown-item bg-transparent c-text-white fs-5 mb-2"
                                    onClick={() => closeOffcanvas("/login")}
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/register"
                                    className="dropdown-item bg-transparent c-text-white fs-5"
                                    onClick={() => closeOffcanvas("/register")}
                                >
                                    Sign up
                                </Link>
                            </li>
                        </ul>
                    )}

                    
                    <div className="mt-4">
                        <div className="sidenav">
                            <h5 className="mt-4">
                                <i className="bi bi-joystick me-2"></i>Generi
                            </h5>

                            <Genres onClick={closeOffcanvas} />

                            <h5 className="mt-4">
                                <i className="bi bi-controller me-2"></i>Platforms
                            </h5>

                            <Platforms onClick={closeOffcanvas} />
                        </div>
                    </div>
                </div>
            </div>

            <Toast ref={toast} />
        </>
    );
}
