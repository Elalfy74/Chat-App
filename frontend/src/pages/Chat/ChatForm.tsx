import { FormEvent, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useAuth } from "../../contexts/AuthContext";
import useHttp from "../../hooks/useHttp";
import { sendMessage } from "../../services/chat";

const ChatForm = () => {
  const { currentUser } = useAuth();

  const [message, setMessage] = useState("");
  const { sendRequest, data, loading, error } = useHttp(sendMessage, true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!message) return;

    setMessage("");

    sendRequest({
      token: currentUser?.token,
      text: message,
    });
  };

  return (
    <form className="px-3 py-3" onSubmit={handleSubmit}>
      <div className=" input-group">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Aa"
          className="flex-1 input input-bordered bg-base-300"
        />
        <button className="btn btn-square" disabled={message.length === 0}>
          <AiOutlineSend className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
};

export default ChatForm;
