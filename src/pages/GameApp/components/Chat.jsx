import RealtimeChat from "./RealtimeChat";
import { Toast } from 'primereact/toast';
import { useRef } from "react";
import supabase from "../../../Supabase/Client";

export default function Chat({ game, session }) {

    const toast = useRef(null);

    async function handleMessageSubmit(event) {
        event.preventDefault();
        const inputMessage = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputMessage));

        if (typeof message === "string" && message.trim().length !== 0) {
            const { error } = await supabase
                .from("messages")
                .insert([
                    {
                        profile_id: session.user.id,
                        profile_username: session.user.user_metadata.username,
                        game_id: game.id,
                        content: message,
                    },
                ])
                .select();

            if (error) {
                toast.current.show({
                    severity: "error",
                    summary: "Invio messaggio non riuscito",
                    detail: error.message,
                    life: 3000,
                });

            } else {
                toast.current.show({
                    severity: "success",
                    summary: "Messaggio inviato",
                    detail: "",
                    life: 3000,
                });

                inputMessage.reset();
            }
        }
    }

    return (
        <>
            <Toast />
            <div className="mt-5 container">
                <h4>Chatta in tempo reale!</h4>
                <div className="chat-container">
                    <div className="chat-messages">
                        <RealtimeChat game={game} />
                    </div>
                    <form onSubmit={handleMessageSubmit} className="chat-form">
                        <input
                            type="text"
                            name="message"
                            placeholder="Scrivi un messaggio..."
                            className="chat-input"
                        />
                        <button type="submit" className="chat-send-btn">Invia</button>
                    </form>
                </div>
            </div>
        </>
    );
}
