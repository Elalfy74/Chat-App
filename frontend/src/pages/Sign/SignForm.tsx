import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { login, signup } from "../../services/auth";
import CustomInput from "./CustomInput";
import { ImSpinner2 } from "react-icons/im";
import Alert from "./Alert";
import { useAuth } from "../../contexts/AuthContext";

let firstRender = true;

const SignForm = ({ loginPage }: { loginPage: boolean }) => {
  const { handleLogin } = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const requestFunc = loginPage ? login : signup;

  const { sendRequest, resetError, loading, data, error } = useHttp(
    requestFunc,
    false
  );

  // Reset Error when swapping between login and signup
  useEffect(() => {
    if (!firstRender) {
      resetError();
    } else {
      firstRender = false;
    }
  }, [resetError, loginPage]);

  // Set The CurrentUser
  useEffect(() => {
    if (data) {
      handleLogin(data);
    }
  }, [data, handleLogin]);

  const userNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //TODO Validation
    if (!userName || !password) return;

    await sendRequest({
      userName,
      password,
    });
  };

  return (
    <>
      {error && <Alert message={error} />}
      <form className="px-3 sm:px-8" onSubmit={handleSubmit}>
        <CustomInput
          label="Username"
          type="text"
          value={userName}
          onChange={userNameChangeHandler}
        />
        <CustomInput
          label="Password"
          type="password"
          value={password}
          onChange={passwordChangeHandler}
        />
        <div className="flex items-center justify-between my-4">
          {loginPage && (
            <a href="#aa" className="text-sm text-gray-200 hover:text-gray-500">
              Forget Password?
            </a>
          )}
          <button
            className={`${loginPage ? "" : "mx-auto"}  btn`}
            type="submit"
            disabled={loading}
          >
            {loading && <ImSpinner2 className="mr-2 animate-spin" />}
            {loginPage ? "Login" : "Signup"}
          </button>
        </div>
      </form>
    </>
  );
};

export default SignForm;
