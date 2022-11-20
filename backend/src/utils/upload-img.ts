import admin from "../utils/firebase";

const bucket = admin.storage().bucket();

export const uploadImg = (file: Express.Multer.File, cb: Function) => {
  const fileName = new Date().toISOString() + "-" + file.originalname;
  const newFile = bucket.file(fileName);

  const fileStream = newFile.createWriteStream();

  fileStream.on("finish", () => {
    newFile
      .getSignedUrl({
        action: "read",
        expires: "03-17-2025",
      })
      .then((url) => cb(url));
  });

  fileStream.end(file.buffer);
};
