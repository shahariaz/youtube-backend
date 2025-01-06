import cloudinary from "cloudinary.v2";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handleUpload = async (file) => {
  try {
    if (!file) return null;
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    console.log("file uploaded successfully");
    return res;
  } catch (error) {
    fs.unlinkSync(file);
    console.log("error uploading file", error);
    return null;
  }
};
export default handleUpload;
