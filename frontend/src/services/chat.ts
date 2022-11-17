import axios from "axios";

export const getMessages = (token: string) => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL!}/chat`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const sendMessage = ({
  token,
  text,
}: {
  token: string;
  text: string;
}) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const bodyParameters = {
    text,
  };

  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL!}/chat/create-msg`,
    bodyParameters,
    config
  );
};
