import { useContext, useState, useEffect } from "react";
import { Link } from "react-router";
import { formatDate } from "../../../utils/formatDate";
import supabase from "../../../Supabase/Client";
import Avatar from "@mui/material/Avatar";
import SessionContext from "../../../context/SessionContext";
import CloseIcon from '@mui/icons-material/Close';
import { useRef } from "react";

export default function MyReviews() {
  const { session } = useContext(SessionContext);
  const [reviews, setReviews] = useState([]);

  // Funzione per caricare le recensioni
  const readReviews = async () => {
    let { data: reviews, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("profile_id", session.user.id);  // recupera le recensioni dell'utente
    if (error) {
      console.log(error);
    } else {
      setReviews(reviews);
    }
  };

  useEffect(() => {
    if (session) {
      readReviews();  // carica le recensioni quando c'è una sessione attiva
    }
  }, [session]);

  return (
    <div className="w-100">
      <h3 className="text-center mb-5">Le tue recensioni</h3>
      {reviews.length === 0 ? (
        <p className="text-center">Non ci sono recensioni al momento.</p>
      ) : (
        <ul className="game_wrapper">
          {reviews.map((review) => (
            <li key={review.id} className="rev-card">
              <Link to={`/game/${review.game_id}`}>
                <div className="d-flex align-items-center flex-column">
                  {/* Se vuoi un avatar per ogni recensione, puoi aggiungere un'immagine del gioco qui */}
                  {/* <Avatar
                    alt={review.game_name}
                    src={review.game_background_image || "https://via.placeholder.com/150"}
                    className="me-2"
                    sx={{
                      width: 50,
                      height: 50,
                      backgroundColor: !review.game_background_image ? "gray" : "transparent",
                    }}
                  /> */}
                  <div className="p-3">
                    <h4 className="m-0">{review.game_name}</h4>
                    <p className="fs-rating mt-2">
                      {review.review_title}
                    </p>
                    <p className="fs-rating mt-2">
                      {review.review_content}
                    </p>
                    <p className="fs-rating mt-2" style={{ color: "gray" }}>
                      Aggiunta il: {formatDate(review.created_at)}
                    </p>
                  </div>
                </div>
              </Link>
              <button
                className="btn close-btn d-flex justify-content-end"
                onClick={(event) => {
                  event.stopPropagation();
                  removeFav(game.game_id)
                }
                }
              >
                <CloseIcon className="fs-6 close-btn" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
