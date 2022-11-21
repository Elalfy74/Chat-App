import openSocket from "socket.io-client";

export default openSocket(process.env.REACT_APP_BACKEND_URL!);
