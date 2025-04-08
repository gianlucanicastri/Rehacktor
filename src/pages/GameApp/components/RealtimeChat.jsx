import { useEffect, useState, useRef } from "react";
import supabase from "../../../Supabase/Client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function RealtimeChat({ game }) {
  const [messages, setMessages] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [error, setError] = useState("");
  const messageRef = useRef(null);

  function scrollSmoothToBottom() {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }

  const getInitialMessages = async () => {
    setLoadingInitial(true);
    const { data: messages, error } = await supabase
      .from("messages")
      .select()
      .eq("game_id", game.id);
    
      if (error) {
      setError(error.message);
      return;
    }
    setLoadingInitial(false);
    setMessages(messages);
  };

  useEffect(() => {
    if (game) {
      getInitialMessages();
    }
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => getInitialMessages()
      )
      .subscribe();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
      channel.unsubscribe();
    };
  }, [game]);

  useEffect(() => {
    scrollSmoothToBottom();
  }, [messages]);

  return (
    <div ref={messageRef}>
      {loadingInitial && <progress className="loading-progress" />}
      {error && <article className="error-message">{error}</article>}
      {messages &&
        messages.map((message) => (
          <div className="chat-message" key={message.id}>
            <div className="chat-message-header">
              <strong>{message.profile_username}</strong>
            </div>
            <div className="chat-message-content d-flex justify-content-between">
              <p>{message.content}</p>
              <p className="chat-timestamp">
                {dayjs(message.created_at).format("DD/MM/YYYY HH:mm")}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
