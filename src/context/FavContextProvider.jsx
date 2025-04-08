import { useState, useEffect, useContext } from "react";
import SessionContext from "./SessionContext";
import supabase from "../Supabase/Client";
import FavContext from "./FavContext";

export default function FavContextProvider({ children }) {
  const { session } = useContext(SessionContext);
  const [liked, setLiked] = useState([]);

  const readFav = async () => {
    let { data: favourite, error } = await supabase
      .from("favourite")
      .select("*")
      .eq("profile_id", session.user.id);
    if (error) {
      console.log(error);
    } else {
      setLiked(favourite);
    }
  };

  useEffect(() => {
    if (session) {
      readFav();
    }
  }, [session]);

  return (
    <FavContext.Provider
      value={{
        liked,
        setLiked
      }}
    >
      {children}
    </FavContext.Provider>
  );
}