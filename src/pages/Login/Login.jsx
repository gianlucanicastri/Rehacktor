import Navbar from "../../components/NavbarApp/Navbar"
import supabase from "../../Supabase/Client";
import { useRef } from "react";
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { useNavigate } from "react-router";
        

export default function Login() {

    const navigate = useNavigate();

    const toast = useRef(null);

    const handleLogin= async (event) => {

        event.preventDefault();
        const formRegister = event.currentTarget;
        const {email, password} = Object.fromEntries(new FormData(formRegister));

        let {data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            toast.current.show({
                severity: "error",
                summary: "Accesso Fallito",
                detail: error.message,
                life: 3000, 
            });
        } else {
            formRegister.reset();
            toast.current.show({
                severity: "success",
                summary: "Accesso Riuscito",
                detail: "",
                life: 3000,
            });
            await new Promise((resolve) => setTimeout(resolve, 1000))
            navigate("/");

        }
    }



    return (
        <>
            <Navbar />
            <Toast ref={toast} />
            <div className="container vh-100 d-flex justify-content-center align-items-center">
                <form onSubmit={handleLogin} className="form-signup">
                    <p className="title">Login</p>
                    <label htmlFor="email">
                        <span>Email</span>
                        <input required placeholder="" type="email" className="input" name="email" />
                    </label>

                    <label htmlFor="password" className="mt-2">
                        <span>Password</span>
                        <input required placeholder="" type="password" className="input" name="password"/>
                    </label>

                    {/* <label>
                        <span>Confirm password</span>
                        <input placeholder="" type="password" className="input" />
                    </label> */}
                    
                    <button className="submit mt-3">Login</button>

                    <p className="signin mt-2">Not registered yet? <a href="/register">Sign up</a></p>
                </form>
            </div>

        </>
    )
}