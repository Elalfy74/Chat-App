import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

import { useAuth } from "../contexts/AuthContext";
import useHttp from "../hooks/useHttp";
import { editAccount } from "../services/auth";

const AccountSettings = ({ hideModal }: { hideModal: () => void }) => {
  const { currentUser, updateUserData } = useAuth();
  const [file, setFile] = useState<File | null>(null);

  const { data, sendRequest, loading, error } = useHttp(editAccount, false);

  const selectedImg = file && URL.createObjectURL(file);

  useEffect(() => {
    if (data) {
      updateUserData("avatarUrl", data.newAvatar);
      hideModal();
    }
  }, [data, updateUserData, hideModal]);

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    sendRequest({
      data: formData,
      token: currentUser?.token,
    });
  };

  return (
    <div className="max-w-full px-6 text-center w-96 md:px-10">
      <h1 className="mb-8 text-2xl font-bold">My Account</h1>
      <img
        src={selectedImg || currentUser?.avatarUrl}
        alt="user-avatar"
        className="object-contain w-32 h-32 mx-auto rounded-lg shadow-lg"
      />
      <p className="mt-4 text-lg font-semibold">@{currentUser?.userName}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="avatar" className="block mt-6 link-accent link ">
          Change Image
        </label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/gif, image/jpeg"
          onChange={handleImgChange}
          style={{ display: "none" }}
        />
        {/*Actions*/}
        <div className="flex justify-between mt-6">
          <button className="btn" onClick={hideModal}>
            Cancel
          </button>
          <button
            className="btn-primary btn"
            disabled={!file || loading}
            type="submit"
          >
            {loading ? <ImSpinner2 className="mr-2 animate-spin" /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
