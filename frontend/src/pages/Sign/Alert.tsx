const Alert = ({ message }: { message: string }) => {
  return (
    <div className="alert alert-error w-[80%] mx-auto mt-3 rounded-md text-md">
      <span>{message}</span>
    </div>
  );
};

export default Alert;
