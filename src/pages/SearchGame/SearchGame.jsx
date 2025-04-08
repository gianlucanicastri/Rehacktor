import { useState } from "react";
import { useLocation } from "react-router";
import { CircleLoader } from "react-spinners";
import GameCard from "../../components/GameCard";
import Pagination from "../../components/Pagination";
import useFetchData from "../../hooks/useFetchData";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
    const query = useQuery();
    const searchQuery = query.get("q") || "";
    const [page, setPage] = useState(1);
    const url = `https://api.rawg.io/api/games?key=d0a2e0e105d14ee2ad9e012e76e9f282&search=${searchQuery}&page_size=24&page=${page}`;

    const { games, loading, error, } = useFetchData(url);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center homeTitle my-3">Search Results for "{searchQuery}"</h1>
                </div>
            </div>
            {loading && <CircleLoader/>}
            {error && <p>{error}</p>}
            <div className="row">
                <div className="game_wrapper">
                    {games.length > 0 ? (
                        games.map((game) => <GameCard key={game.id} game={game} />)
                    ) : (
                        <p>No games found</p>
                    )}
                </div>
            </div>
            <div className="mt-5 d-flex justify-content-center">
                <Pagination page={page} setPage={setPage} />
            </div>
        </div>
    );
}