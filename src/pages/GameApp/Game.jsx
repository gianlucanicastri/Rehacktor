import { Link, useParams } from "react-router"
import useFetchData from "../../hooks/useFetchData";
import { CircleLoader } from "react-spinners";
import { useContext, useEffect, useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'
import SessionContext from "../../context/SessionContext";
import supabase from "../../Supabase/Client";
import { useRef } from "react";
import { Toast } from 'primereact/toast';
import GameReviews from "./components/GameReviews";
import Chat from "./components/Chat";
import { RateReview } from "@mui/icons-material";



export default function Game() {
    const { session } = useContext(SessionContext);
    const { id } = useParams();


    const url = `https://api.rawg.io/api/games?key=d0a2e0e105d14ee2ad9e012e76e9f282`;

    const { game, loading, error, trailer } = useFetchData(url, null, id);
    // console.log(game.id);

    const [liked, setLiked] = useState(false);
    const [screenshots, setScreenshots] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        if (game?.background_image) {
            document.body.style.backgroundImage = `url(${game.background_image})`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundRepeat = "no-repeat";

        }

        return () => {
            document.body.style.backgroundImage = "";
        };
    }, [game]);

    //! INSERT

    const addToFav = async (game) => {

        const { error } = await supabase
            .from('favourite')
            .insert([
                { 'profile_id': session.user.id, 'game_id': game.id, 'game_name': game.name, 'game_image': game.background_image },
            ])
            .select();

        if (error) {
            toast.current.show({
                severity: "error",
                summary: "Errore di inserimento nei preferiti",
                detail: error.message,
                life: 3000,
            });
        } else {

            toast.current.show({
                severity: "success",
                summary: "Gioco inserito correttamente nei preferiti",
                detail: "",
                life: 3000,
            });
            readFav();
        }
    }

    //! READ
    const readFav = async () => {

        let { data: favourite, error } = await supabase
            .from("favourite")
            .select("*")
            .eq("profile_id", session.user.id)
            .eq('game_id', game.id);

        if (error) {
            toast.current.show({
                severity: "error",
                summary: "Gioco non trovato",
                detail: error.message,
                life: 3000,
            });
        } else {
            // console.log('Giochi preferiti: ',favourite);
            setLiked(favourite.length > 0);


        }
    };

    //! DELETE

    const removeFav = async (game) => {

        const { error } = await supabase
            .from('favourite')
            .delete()
            .eq('game_id', game.id)
            .eq("profile_id", session.user.id);
        if (error) {
            toast.current.show({
                severity: "error",
                summary: "Gioco non rimosso correttamente dai preferiti",
                detail: error.message,
                life: 3000,
            });

            readFav();

        } else {

            toast.current.show({
                severity: "success",
                summary: "Gioco rimosso correttamente dai preferiti",
                detail: "",
                life: 3000,
            });

            readFav();

        }
    }

    useEffect(() => {
        if (game) {
            console.log("Game data:", game); 
            console.log("Short screenshots:", game?.short_screenshots); 
        }
        if (session) readFav();

    }, [game]);

    useEffect(() => {
        const fetchScreenshots = async () => {
            try {
                const response = await fetch(
                    `https://api.rawg.io/api/games/${id}/screenshots?key=d0a2e0e105d14ee2ad9e012e76e9f282`);

                if (!response.ok)
                    throw new Error('Errore nel recupero degli screenshots');

                const json = await response.json();

                setScreenshots(json.results || []);

            } catch (error) {
                console.error("Errore screenshots:", error);
            }
        }

        fetchScreenshots();
    }, [id]);


    if (loading) return <CircleLoader />;
    if (error) return <h2>Errore: {error}</h2>;
    if (!game) return <h2>Gioco non trovato</h2>;

    return (
        <>
            <Toast ref={toast} />
            {game.background_image && <div className="overlay"></div>}
            <div className="container mt-4">
                <div className="row">
                    <h1 className="mb-4">{game.name}</h1>
                    {session && (
                        <div className="col-12 gap-3 d-flex mb-4">
                            <button
                                className="rounded-pill p-2 bg-darkGrey text-white d-flex align-items-center"
                                onClick={() => {
                                    if (liked) {
                                        removeFav(game);
                                    } else {
                                        addToFav(game);
                                    }
                                }}
                            >
                                {liked ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                                {liked ? (
                                    <FavoriteIcon className="ms-1" />
                                ) : (
                                    <FavoriteBorderIcon className="ms-1" />
                                )}
                            </button>
                            <Link to={`/reviews/${id}`} className="rounded-pill p-2 bg-darkGrey text-white d-flex align-items-center text-decoration-none">
                                Lascia una recensione
                                <RateReview className="ms-2" />
                            </Link>
                        </div>
                    )}

                </div>
                <div className="row">
                    <div className="col-md-6 col-12">
                        <div>
                            <div className="mt-4">
                                <p><strong>Data di rilascio:</strong> {game.released}</p>
                                <hr />
                                <p><strong>Valutazione:</strong> {game.rating} ⭐</p>
                                <hr />
                                <p><strong>Metacritic:</strong> {game.metacritic || "N/A"}</p>
                                <hr />
                                <p><strong>Generi:</strong> {game.genres.map(genre => genre.name).join(', ')}</p>
                                <hr />
                                <p><strong>Piattaforme:</strong> {game.platforms ? game.platforms.map(platform => platform.platform.name).join(', ') : "Non disponibile"}</p>
                                <hr />
                                <p><strong>Tempo medio di gioco:</strong> {game.playtime} ore</p>
                                <hr />
                                <p><strong>Publisher:</strong> {game.publishers.map(pub => pub.name).join(', ')}</p>
                                <hr />
                                <p><strong>Developer:</strong> {game.developers.map(dev => dev.name).join(', ')}</p>
                                <hr />

                            </div>
                            <h3 className="mt-4">Descrizione:</h3>
                            <p
                                className="description-text"
                                style={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: expanded ? "unset" : 5,
                                    overflow: "hidden",
                                }}
                            >
                                {game.description_raw || "Descrizione non disponibile"}
                            </p>
                            {game.description_raw && game.description_raw.length > 200 && (
                                <button
                                    className="btn btn-link p-0 "
                                    onClick={() => setExpanded(!expanded)}
                                >
                                    {expanded ? "Leggi di meno" : "Leggi di più"}
                                </button>
                            )}
                            <hr />
                            <GameReviews game={game} session={session} />
                            <hr className="d-md-none" />
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div>
                            <div className="image-gallery d-flex my-md-0 my-4">
                                <div className="row">

                                    {screenshots.slice(0, 4).map((screenshot, index) => (
                                        <div key={index} className="col-6 mb-2">
                                            <img
                                                src={screenshot.image}
                                                alt={`Screenshot ${index + 1}`}
                                                className="w-100 rounded"
                                            />
                                        </div>

                                    ))

                                    }
                                </div>
                            </div>
                            <hr className="d-md-none" />
                        </div>
                        {/* Trailer */}
                        {trailer && (
                            <div className="mt-4">
                                <h3>Trailer Ufficiale:</h3>
                                <video controls width="100%">
                                    <source src={trailer} type="video/mp4" />
                                    Il tuo browser non supporta la riproduzione video.
                                </video>
                            </div>
                        )}
                        {session && <Chat className="mt-5" game={game} session={session} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}