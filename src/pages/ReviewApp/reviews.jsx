import { useParams, Link } from "react-router"
import supabase from "../../Supabase/Client";
import useFetchData from "../../hooks/useFetchData";
import { Toast } from 'primereact/toast';
import { useRef } from "react";
import { CircleLoader } from "react-spinners";

export default function Reviews() {
    const { id } = useParams();

    const initialUrl = `https://api.rawg.io/api/games/${id}?key=d0a2e0e105d14ee2ad9e012e76e9f282`;

    const { game, loading, error } = useFetchData(initialUrl, null, id);

    // console.log("Dati del gioco:", game);

    const toast = useRef(null);

    const handleReviewSubmit = async (event) => {

        event.preventDefault();
        const review = event.currentTarget;
        const { title, content } = Object.fromEntries(new FormData(review));
        const { error } = await supabase
            .from("reviews")
            .insert([
                {
                    review_title: title,
                    review_content: content,
                    game_id: id,
                    game_name: game.name
                },
            ])
            .select();

        if (error) {
            toast.current.show({
                severity: "error",
                summary: "Errore di inserimento della recensione",
                detail: error.message,
                life: 3000,
            });
        } else {

            toast.current.show({
                severity: "success",
                summary: "Recensione inserita con successo",
                detail: "",
                life: 3000,
            });
        }

    }

    if (loading) return <CircleLoader />;
    if (error) return <h2>Errore: {error}</h2>;

    return (
        <>
            <Toast ref={toast} />
            <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
                <h1 className="mt-5">
                    Lascia una recensione per il gioco {game?.name || "Caricamento..."}
                </h1>
                <form onSubmit={handleReviewSubmit} className="form-signup">
                    <label htmlFor="title">
                        <span>Titolo recensione</span>
                        <input required placeholder="" type="text" className="input" name="title" />
                    </label>

                    <label htmlFor="commento" className="mt-2">
                        <span>Recensione</span>
                        <textarea required placeholder="Scrivi la tua recensione..." className="input" name="content" id="commento" rows="5"></textarea>
                    </label>

                    <button className="submit mt-3">Invia Recensione</button>
                </form>

            </div>
        </>
    )

}