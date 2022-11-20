import { ChangeEvent, FormEvent, useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import useHttp from "../hooks/useHttp";
import { editAccount } from "../services/auth";

const AccountSettings = ({ hideModal }: { hideModal: () => void }) => {
  const { currentUser } = useAuth();
  const [file, setFile] = useState<File | null>(null);

  const { data, sendRequest, loading, error } = useHttp(editAccount, false);

  const selectedImg = file && URL.createObjectURL(file);

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
    <div className="px-10 text-center w-80">
      <h1 className="mb-10 text-2xl font-bold">My Account</h1>
      <img
        src={selectedImg || currentUser?.avatarUrl}
        alt="user-avatar"
        className="object-fill w-32 h-32 mx-auto rounded-lg shadow-lg"
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
          <button className="btn-primary btn" disabled={!file} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
