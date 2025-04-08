import Navbar from "../../components/NavbarApp/Navbar"
import supabase from "../../Supabase/Client";
import { useRef } from "react";
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { useNavigate } from "react-router";
        

export default function SingUp() {

    const navigate = useNavigate();
    const toast = useRef(null);

    const handleSignUp= async (event) => {

        event.preventDefault();
        const formRegister = event.currentTarget;
        const {first_name, last_name, username, email, password} = Object.fromEntries(new FormData(formRegister));

        let { error } = await supabase.auth.signUp({
            email,
            password,
            options : {
                data: {
                    first_name,
                    last_name,
                    username
                }
            },
        })

        if (error) {
            toast.current.show({
                severity: "error",
                summary: "Registrazione Fallita",
                detail: error.message,
                life: 10000, 
            });
        } else {
            toast.current.show({
                severity: "success",
                summary: "Registrazione Riuscita",
                detail: "Controlla la tua email per verificare il tuo account.",
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
            <div className="container mt-5 vh-100 d-flex justify-content-center align-items-center">
                <form onSubmit={handleSignUp} className="form-signup">
                    <p className="title">Register</p>
                    <p className="message">Signup now and get full access to our app.</p>

                    <label htmlFor="first_name">
                        <span>Firstname</span>
                        <input placeholder=""  required type="text" className="input" name="first_name" id="first_name" />
                    </label>

                    <label htmlFor="last_name" className="mt-2">
                        <span>Lastname</span>
                        <input placeholder="" required type="text" className="input" name="last_name" id="last_name" />
                    </label>

                    <label htmlFor="username" className="mt-2">
                        <span>Username</span>
                        <input placeholder="" required type="text" className="input" name="username" id="username" />
                    </label>
                
                    <label htmlFor="email" className="mt-2">
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
                    
                    <button className="submit mt-4">Submit</button>

                    <p className="signin mt-3">Already have an account? <a href="/login">Sign in</a></p>
                </form>
            </div>

        </>
    )
}