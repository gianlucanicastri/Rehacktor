import { useParams } from "react-router"
import useFetchData from "../../hooks/useFetchData";
import { CircleLoader } from "react-spinners";
import GameCard from "../../components/GameCard";
import Pagination from "../../components/Pagination";
import { useState } from "react";

export default function Genre() {

    const {genre} = useParams();
    const [page, setPage] = useState(1);

    // console.log(genre);
    

    const url = `https://api.rawg.io/api/games?key=d0a2e0e105d14ee2ad9e012e76e9f282&genres=${genre}&page=${page}`;

   const {games, loading, error} = useFetchData(url);

    
    return(
        <>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-capitalize">{genre}</h1>
                        
                    </div>
                </div>
            
                <div className="row mt-5">
                    {loading && (<CircleLoader className="mb-4" />)}
                    <div className="game_wrapper">
                        {games.map((game) => (
                            <GameCard key={game.id} game= {game} />
                        ))}
                    </div>
                </div>
                <div className="mt-5 d-flex justify-content-center">
                    <Pagination page={page} setPage={setPage}  />
                </div>
            </div>
            
        </>
    )
}