import axios from "axios";

type SignParmas = {
  userName: string;
  password: string;
};

export const login = async ({ userName, password }: SignParmas) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_URL!}/auth/login`, {
    userName,
    password,
  });
};

export const signup = async ({ userName, password }: SignParmas) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_URL!}/auth/signup`, {
    userName,
    password,
  });
};

export const logout = () => {};
