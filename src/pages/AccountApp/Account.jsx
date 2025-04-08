import { useContext, useState, useEffect } from "react";
import SessionContext from "../../context/SessionContext";
import BasicTabs from "./components/TabsComponent";
import { Avatar } from "@mui/material";
import supabase from "../../Supabase/Client";
export default function Account() {
    const { session, user, loading } = useContext(SessionContext);
    const [avatar_url, setAvatarUrl] = useState(null);

    useEffect(() => {
        let ignore = false;
        async function getProfile() {

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


    if (loading) {
        return;
    }

    if (!user) {
        return;
    }

    return (
        <>
            <div className="container mt-4">
                <div className="d-flex justify-content-center">
                    {user ? <Avatar style={{width: '130px', height: "130px"}} src={`https://oiflwdvvdflmgcrxezuj.supabase.co/storage/v1/object/public/avatars/${avatar_url}`} /> : "https://via.placeholder.com/150"}
                </div>
                <h1 className="text-center mb-5">{user.user_metadata.first_name}</h1>
                <BasicTabs />
            </div>
        </>
    )
}  