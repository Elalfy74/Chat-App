import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

import { useAuth } from "../../contexts/AuthContext";
import useHttp from "../../hooks/useHttp";
import { login, signup } from "../../services/auth";
import Alert from "./Alert";
import CustomInput from "./CustomInput";

let firstRender = true;

const SignForm = ({ loginPage }: { loginPage: boolean }) => {
  const { handleLogin } = useAuth();

  const [userName, setUserName] = useState("");
  const [userNameTouched, setUserNameTouched] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

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

  const userNameHasError = userName.trim().length < 3 && userNameTouched;
  const passwordHasError = password.trim().length < 5 && passwordTouched;

  const userNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userNameHasError || passwordHasError) return;

    await sendRequest({
      userName,
      password,
    });
  };

  return (
    <>
      {error && <Alert errorMessage={error} />}
      <form className="px-3 sm:px-8" onSubmit={handleSubmit}>
        <CustomInput
          autFocus
          label="Username"
          type="text"
          value={userName}
          onChange={userNameChangeHandler}
          onBlur={() => setUserNameTouched(true)}
          errorMsg="Username must be at Least 3 Characters"
          hasError={userNameHasError}
        />
        <CustomInput
          label="Password"
          type="password"
          value={password}
          onChange={passwordChangeHandler}
          onBlur={() => setPasswordTouched(true)}
          errorMsg="Password must be at Least 5 Characters"
          hasError={passwordHasError}
        />
        <div className="flex items-center justify-between my-4">
          <button className="mx-auto btn" type="submit" disabled={loading}>
            {loading && <ImSpinner2 className="mr-2 animate-spin" />}
            {loginPage ? "Login" : "Signup"}
          </button>
        </div>
      </form>
    </>
  );
};

export default SignForm;
