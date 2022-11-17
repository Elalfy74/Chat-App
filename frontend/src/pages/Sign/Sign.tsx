import { useState } from "react";
import { CurrentUserType } from "../../App";
import Footer from "./Footer";
import Heading from "./Heading";
import SignForm from "./SignForm";

type SignProps = {
  handleChangeCurrentUser: (user: CurrentUserType | null) => void;
};

const Sign = ({ handleChangeCurrentUser }: SignProps) => {
  const [loginPage, setLogin] = useState(true);

  // Swap Between Login and Signup
  const handleChangeSign = () => {
    setLogin(!loginPage);
  };

  return (
    <div className="bg-base-200 rounded-lg overflow-hidden pt-6 text-center w-[450px] max-w-[90%]">
      <Heading loginPage={loginPage} />
      <SignForm
        loginPage={loginPage}
        handleChangeCurrentUser={handleChangeCurrentUser}
      />
      <Footer loginPage={loginPage} handleChangeSign={handleChangeSign} />
    </div>
  );
};

export default Sign;
