import { Outlet } from "react-router";
import Navbar from "../components/NavbarApp/Navbar";
import Sidebar from "../components/SidebarApp/sidebar";

export default function Layout() {
    

    return (
        <>
            
            <Navbar />
            <div className="main d-flex mb-5">
                <Sidebar />
                <Outlet />
            </div>
        </>
    );
}
