import { Link } from "react-router";
import useFetchData from "../../../hooks/useFetchData";
import { useState } from "react";

const initialUrl = "https://api.rawg.io/api/genres?key=d0a2e0e105d14ee2ad9e012e76e9f282&";

export default function Genres({ onClick }) {

    const {games, loading, error} = useFetchData(initialUrl);
    const [showAll, setShowAll] = useState(false);

    const genresShow = showAll ? games : games.slice(0, 6);
    
    return(
        <>
            <ul className="list-unstyled">
                {genresShow.length > 0 ? (
                    genresShow.map((genre) => (
                        <li className="p-sidebar" key={genre.id}>
                            <Link to={`/Genre/${genre.slug}`} onClick={() => onClick(`/Genre/${genre.slug}`)}>
                                {genre.name}
                            </Link>
                        </li>
                    ))
                ) : (
                    <p className="p-sidebar">Nessun genere disponibile</p>
                )}
            </ul>

            {games.length > 6 && (
                <button className="d-flex align-items-center ms-3 p-2 bg-transparent rounded-3 border-0" onClick={() => setShowAll(!showAll)}>
                    {showAll
                        ? <p className="mb-0">Hide<i className="bi bi-caret-up-fill ms-1"></i></p>
                        : <p className="m-0">Show<i className="bi bi-caret-down-fill ms-1"></i></p>
                    }
                </button>
            )}
        </>
    );
}
