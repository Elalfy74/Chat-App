import { useState } from "react";

import Footer from "./Footer";
import Heading from "./Heading";
import SignForm from "./SignForm";

const Sign = () => {
  const [loginPage, setLogin] = useState(true);

  // Swap Between Login and Signup
  const handleChangeSign = () => {
    setLogin(!loginPage);
  };

  return (
    <div className="w-[450px] max-w-[90%] overflow-hidden rounded-lg bg-base-200 pt-6 text-center">
      <Heading loginPage={loginPage} />
      <SignForm loginPage={loginPage} />
      <Footer loginPage={loginPage} handleChangeSign={handleChangeSign} />
    </div>
  );
};

export default Sign;
