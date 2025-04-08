import { useState, useEffect } from "react";

export default function useFetchData(url, platformUrl = null, gameId = null) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [platformName, setPlatformName] = useState("");
    const [game, setGame] = useState(null);
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(url);

                if (response.ok) {
                    const json = await response.json();
                    setGames(json.results);
                } else {
                    setError("Qualcosa è andato storto, riprova o contatta l'assistenza");
                }

                //FETCH PLATFORM //


                if(platformUrl) {
                    
                    const platformResponse = await fetch(platformUrl);

                    if (!platformResponse.ok) {
                       
                        throw new error('Il server non risponde')
                    }

                    const dataPlatform = await platformResponse.json();

                    setPlatformName(dataPlatform.name);
                }

            } catch (error) {
                setError("Network assente: " + error.message);
            
            } finally {
                setLoading(false);
            }

        };

        fetchData();
    }, [url, platformUrl]);


    // FETCH PAGINA DETAGLIO GAME//

    useEffect(() => {
        if (gameId) {
            const fetchGame = async () => {  
                try {
                    setLoading(true);
                    setError("");

                    const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=d0a2e0e105d14ee2ad9e012e76e9f282`);
                    
                    if (response.ok) {
                        const json = await response.json();
                        setGame(json); 
                    } else {
                        setError("Qualcosa è andato storto, riprova o contatta l'assistenza");
                    }
                } catch (error) {
                    setError("Network assente: " + error.message);
                } finally {
                    setLoading(false);
                }
            };

            const fetchTrailer = async () => {
                
                try {
                    const response = await fetch(`https://api.rawg.io/api/games/${gameId}/movies?key=d0a2e0e105d14ee2ad9e012e76e9f282`)

                    if (response.ok) {
                        const json = await response.json();
                        if (json.results.length > 0) {
                            setTrailer(json.results[0].data.max); // 👈 Prende il video migliore disponibile
                        }
                    }
                } catch (error) {
                    console.error("Errore nel caricamento del trailer:", error);
                }
            };

                
            

            fetchGame();  
            fetchTrailer();
        }
    }, [gameId]);




    return { games, game, loading, error, platformName, trailer };
}
