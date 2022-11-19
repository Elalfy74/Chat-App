import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import useHttp from "../hooks/useHttp";
import { getChat } from "../services/chat";

const ChatWithUsers = ({ hideModal }: { hideModal: () => void }) => {
  const [userName, setUserName] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const { data, sendRequest, error } = useHttp(getChat, false);

  useEffect(() => {
    if (data) {
      hideModal();
      navigate(`/chat/${data.chatId}`);
    }
  }, [data, navigate, hideModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName) return;
    sendRequest({
      token: currentUser?.token,
      otherUserName: userName,
    });
  };

  return (
    <>
      <h3 className="text-lg font-bold">Chat With Users Now !</h3>
      <label
        className="absolute btn btn-sm btn-circle right-2 top-2"
        onClick={hideModal}
      >
        X
      </label>
      <form className="mt-8 form-control" onSubmit={handleSubmit}>
        <div className="input-group">
          <span>@</span>
          <input
            type="text"
            className="flex-1 input input-bordered"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
          />
          <button
            type="submit"
            className="btn"
            disabled={userName.length === 0}
          >
            Send
          </button>
        </div>
      </form>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </>
  );
};

export default ChatWithUsers;
