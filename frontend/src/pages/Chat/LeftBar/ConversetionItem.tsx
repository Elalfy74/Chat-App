const ConversetionItem = () => {
  return (
    <div className="flex justify-between px-4 py-4 duration-300 cursor-pointer hover:bg-base-100">
      <div className="flex items-center flex-1 gap-2">
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="avatar"
          className="w-10 h-10 rounded-full "
        />
        <div className="hidden sm:block">
          <p className="font-normal text-slate-200">Mahmoud ELalfy</p>
          <span className="text-sm">My Account</span>
        </div>
      </div>
      <p className="hidden text-sm sm:block">12:00 PM</p>
    </div>
  );
};

export default ConversetionItem;
