import Picker, { EmojiClickData, Theme } from "emoji-picker-react";
import { FormEvent, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { useParams } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import useHttp from "../../hooks/useHttp";
import { sendMessage } from "../../services/chat";

const ChatForm = () => {
  const { currentUser } = useAuth();
  const { chatId } = useParams();

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
      chatId,
    });
  };

  return (
    <form className="px-2 py-3 sm:px-3" onSubmit={handleSubmit}>
      <div className=" input-group">
        <div className="relative">
          <button
            type="button"
            className="btn mr-1 p-2 sm:mr-2"
            onClick={() => setShowEmojPicker(!showEmojPicker)}
          >
            <GrEmoji className="h-6 w-6" />
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
          className="input-bordered input flex-1 bg-base-300"
        />
        <button
          className="btn-square btn"
          disabled={message.length === 0}
          type="submit"
        >
          <AiOutlineSend className="h-6 w-6" />
        </button>
      </div>
    </form>
  );
};

export default ChatForm;
