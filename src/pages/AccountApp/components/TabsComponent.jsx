import { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import ProfileAccount from "./ProfileAccount";
import Favorites from "./Favorites";
import MyReviews from "./myReviews";

export default function BasicTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-around mob-width">
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Profilo" />
                    <Tab label="Giochi Preferiti" />
                    <Tab label="Recensioni" />
                </Tabs>
            </div>

            <div className="mt-5">
                {value === 0 && <ProfileAccount />}
                {value === 1 && <Favorites />}
                {value === 2 && <MyReviews />}
            </div>
        </div>
    );
}
