import axios from "../lib/axios";

type SignParmas = {
  userName: string;
  password: string;
};

export const login = async ({ userName, password }: SignParmas) => {
  return await axios.post("auth/login", {
    userName,
    password,
  });
};

export const signup = async ({ userName, password }: SignParmas) => {
  return await axios.post(`auth/signup`, {
    userName,
    password,
  });
};

type EditAccountParams = {
  data: FormData;
  token: string;
};

export const editAccount = async ({ data, token }: EditAccountParams) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return await axios.patch("auth/update-user", data, config);
};

export const logout = () => {};
