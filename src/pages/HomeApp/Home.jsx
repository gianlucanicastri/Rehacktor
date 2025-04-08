import GameCard from "../../components/GameCard";
import Pagination from "../../components/Pagination";
import useFetchData from "../../hooks/useFetchData";
import { CircleLoader } from "react-spinners";
import { useState } from "react";


// const api_key = d0a2e0e105d14ee2ad9e012e76e9f282;



export default function Home() {
    const [page, setPage] = useState(1);
    const url = `https://api.rawg.io/api/games?key=d0a2e0e105d14ee2ad9e012e76e9f282&dates=2023-01-01,2024-12-31&page_size=24&page=${page}`;
    const { games, loading, error } = useFetchData(url);


    

    return(
        <>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        <h1>New and Tranding</h1>
                        <h6>Based on player counts and release date</h6>
                    </div>
                </div>
            
                <div className="row mt-5">
                    {loading && (<CircleLoader className="mb-4 d-flex justify-content-center" />)}
                    <div className="game_wrapper">
                        {games.map((game) => (
                            <GameCard key={game.id} game= {game} />
                        ))}
                    </div>
                </div>
                <div className="mt-5 d-flex justify-content-center">
                    <Pagination page={page} setPage={setPage} />
                </div>
            </div>
            
        </>
    )
}