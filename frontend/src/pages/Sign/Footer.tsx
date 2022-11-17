type FooterProps = {
  loginPage: boolean;
  handleChangeSign: () => void;
};

const Footer = ({ loginPage, handleChangeSign }: FooterProps) => {
  return (
    <div className="py-4 bg-gray-700 center">
      <span className="text-sm text-gray-200">
        {loginPage ? "Don't have an account? " : "Already have an account?"}
      </span>
      <button
        onClick={handleChangeSign}
        className="mx-2 text-sm font-bold text-blue-400 hover:underline"
      >
        {loginPage ? "Register" : "Login"}
      </button>
    </div>
  );
};

export default Footer;
