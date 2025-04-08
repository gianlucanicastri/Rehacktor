import { useContext } from "react";
import { Link } from "react-router";
import FavContext from "../../../context/FavContext";
import { formatDate } from "../../../utils/formatDate";
import Avatar from "@mui/material/Avatar";
import CloseIcon from '@mui/icons-material/Close';
import SessionContext from "../../../context/SessionContext";
import { useRef } from "react";
import supabase from "../../../Supabase/Client";

export default function Favorites() {
  const { liked } = useContext(FavContext);
  const { session } = useContext(SessionContext);
  const toast = useRef(null);

  const removeFav = async (gameId) => {

    const confirmDelete = window.confirm("Sei sicuro di voler eliminare il gioco dai preferiti?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('favourite')
      .delete()
      .eq('game_id', gameId)
      .eq('profile_id', session.user.id);

    if (error) {
      toast.current.show({
        severity: "error",
        summary: "Errore nella rimozione dai preferiti",
        detail: error.message,
        life: 3000,
      });
    } else {
      toast.current.show({
        severity: "success",
        summary: "Gioco rimosso dai preferiti",
        detail: "",
        life: 3000,
      });

      setLiked(liked.filter(game => game.game_id !== gameId));
    }
  };

  return (
    <div className="w-100">
      <h3 className="text-center mb-5">I tuoi giochi preferiti</h3>
      {liked.length === 0 ? (
        <p className="text-center">Non ci sono giochi preferiti al momento.</p>
      ) : (
        <ul className="game_wrapper">
          {liked.map((game) => (
            <li key={game.game_id} className="fav-card">
              <Link to={`/game/${game.game_id}`}>
                <div className="d-flex align-items-center">
                  <Avatar alt={game.game_name} src={game.game_image || "https://via.placeholder.com/150"} className="me-2" />
                  <div>
                    <h4 className="m-0">{game.game_name}</h4>
                    <p className="fs-rating">
                      Aggiunto il: {formatDate(game.created_at)}
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
