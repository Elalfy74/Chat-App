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
    <div className="bg-base-200 rounded-lg overflow-hidden pt-6 text-center w-[450px] max-w-[90%]">
      <Heading loginPage={loginPage} />
      <SignForm loginPage={loginPage} />
      <Footer loginPage={loginPage} handleChangeSign={handleChangeSign} />
    </div>
  );
};

export default Sign;
