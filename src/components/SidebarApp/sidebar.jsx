import { Link } from "react-router";
import Genres from "./components/Genres";
import Platforms from "./components/Platform";




export default function Sidebar() {

    return(
        <>
            <div className="sidenav d-none d-md-block">
                <Link className="p-sidebar mt-4 fs-5" to="/"><i class="bi bi-house-door me-2"></i>Home</Link>
                <h5 className="p-sidebar mt-4"><i class="bi bi-joystick me-2"></i>Generi</h5>
                    
                    <Genres />

                <h5 className="p-sidebar mt-4"><i class="bi bi-controller me-2"></i>Platforms</h5>
                    <Platforms />
            </div>
        </>
    )
}