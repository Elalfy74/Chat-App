import { FormEvent, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useAuth } from "../../contexts/AuthContext";
import useHttp from "../../hooks/useHttp";
import { sendMessage } from "../../services/chat";
import Picker, { EmojiClickData, Theme } from "emoji-picker-react";
import { GrEmoji } from "react-icons/gr";

const ChatForm = () => {
  const { currentUser } = useAuth();

  const [message, setMessage] = useState("");
  const [showEmojPicker, setShowEmojPicker] = useState(false);
  const { sendRequest, data, loading, error } = useHttp(sendMessage, true);

  const onEmojiClick = (emjObj: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emjObj.emoji);
    setShowEmojPicker(false);
  };

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
        <div className="relative">
          <button
            type="button"
            className="p-2 mr-2 btn"
            onClick={() => setShowEmojPicker(!showEmojPicker)}
          >
            <GrEmoji className="w-6 h-6" />
          </button>
          {showEmojPicker && (
            <div className="absolute -top-[450px] -left-[175px]">
              <Picker theme={Theme.DARK} onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Aa"
          className="flex-1 input input-bordered bg-base-300"
        />
        <button
          className="btn btn-square"
          disabled={message.length === 0}
          type="submit"
        >
          <AiOutlineSend className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
};

export default ChatForm;
