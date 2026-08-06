import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No image file provided.",
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "kisaan_mitr_scans",
      },
      (error, result) => {
        if (error) {
          return res.status(500).json({
            error: "Cloudinary upload failed.",
          });
        }

        res.json({
          imageUrl: result.secure_url,
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({
      error: "Server Error",
    });
  }
};