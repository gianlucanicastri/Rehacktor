import { useState } from "react";
import { Link } from "react-router";


export default function GameCard({game}) {
    
    const [hidden, setHidden] = useState(true);
    const genres = game.genres.map((genre) => genre.name).join(', ')
    
    
    return(
        <>
            <Link to={`/Game/${game.id}`} className="card border-0 bg-darkGrey mb-3 rounded-3">
                <div
                onMouseEnter={() => setHidden(false)}
                onMouseLeave={() => setHidden(true)}
                >
                    <img className="rounded-3 image" src={game.background_image} alt={game.name}/>
                    <div className="card-body">
                        <h6 className="fs-6">{game.name}</h6>
                        <div className="d-flex gap-2">
                            <p className=" shadow bg-grey border-0 fs-rating rounded-2 py-1 px-2 my-2"><i className="bi bi-star-fill fs-rating me-2"></i>{game.rating}/{game.rating_top}</p>
                            <p className=" shadow bg-grey border-0 fs-rating text-center rounded-2 py-1 px-2 my-2"><i className="bi bi-bookmark-heart fs-rating me-2"></i>{game.added}</p> 
                        </div>
                
                    {hidden ? (
                        <span className="fs-rating"></span>
                    ) : (
                        <>
                        <div className="card-extra-content p-3 rounded-3">
                            <div className="d-flex justify-content-between mt-2 ">
                                <span className="fs-rating">Release:</span>
                                <span className="fs-rating">{game.released}</span>
                                </div>
                            <div className="d-flex justify-content-between mt-2">
                                <span className="fs-rating me-5">Genres:</span>
                                <span className="fs-rating">{genres}</span>
                            </div>
                        </div>
                    
                    </>
                )}
                
                
                </div>
                </div>
            </Link>
        
        
        </>
    )
}