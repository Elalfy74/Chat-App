const Alert = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="text-md alert alert-error mx-auto mt-3 w-[80%] rounded-md">
      <span>{errorMessage}</span>
    </div>
  );
};

export default Alert;
