const Heading = ({ loginPage }: { loginPage: boolean }) => {
  return (
    <>
      <h2 className="text-3xl font-bold text-white ">Chat App</h2>

      <p className="mt-1 text-xl font-medium text-gray-200">
        {loginPage ? "Login" : "Signup"}
      </p>
    </>
  );
};

export default Heading;
