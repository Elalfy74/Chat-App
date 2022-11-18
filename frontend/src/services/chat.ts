import axios from "axios";

export const getMessages = (token: string) => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL!}/chat`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

type SendMessageParams = {
  token: string;
  text: string;
};

export const sendMessage = ({ token, text }: SendMessageParams) => {
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
