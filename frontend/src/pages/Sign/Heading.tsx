const Heading = ({ loginPage }: { loginPage: boolean }) => {
  return (
    <>
      <h2 className="text-3xl font-bold text-white ">Chat App</h2>

      {loginPage && (
        <h3 className="mt-1 text-xl font-medium text-gray-200">Welcome Back</h3>
      )}

      <p className="mt-1 text-center text-gray-400">Login or create account</p>
    </>
  );
};

export default Heading;
