import { useState, useEffect } from "react";
import supabase from "../../../Supabase/Client";
import { formatDate } from "../../../utils/formatDate";

export default function GameReviews({ game }) {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const readReviews = async () => {
            if (game) {
                let { data: reviews, error } = await supabase
                    .from("reviews")
                    .select("*")
                    .eq("game_id", game.id);
                if (error) {
                    console.log(error);
                } else {
                    console.log(reviews);
                    setReviews(reviews);
                }
            }
        };
        readReviews();
    }, [game]);

    return (
        <>
            <h3 className="mt-3">Recensioni</h3>
            {reviews.map((review) => (
                <article key={review.id}>
                    <strong>{review.review_title}</strong>
                    <p>{review.review_content}</p>
                    <small>
                        Pubblicata: {formatDate(review.created_at)}
                    </small>
                </article>
            ))}
        </>
    )
}