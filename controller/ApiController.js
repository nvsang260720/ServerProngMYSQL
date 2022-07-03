const cloudinary = require("../middleware/cloudinary");
const Consult = require("../models/consult");

class ApiController {
  getAllConsult = async (req, res) => {
    try {
      Consult.find(function (err, data) {
        if (err)
          return res.status(300).json({ success: false, message: "Get failed!" });
        if (data) {
          return res.status(200).json({
            success: true,
            data: data,
          });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  };
  getConsult = async (req, res) => {
    const consultID = req.params.id;
    console.log(consultID);
    try {
      Consult.findById(consultID, function (err, data) {
        if (err)
          return res.status(300).json({ success: false, message: "Get failed!" });
        if (data) {
          return res.status(200).json({
            success: true,
            data: data,
          });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  };
  postConsult = async(req, res) => {

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: "upload_avata",
      });
      req.body.url_image = result.url;
    }
    try {
      Consult.insert(req.body, function (err, data) {
        if (err)
          return res.status(300).json({ success: false, message: "Add failed!" });
        if (data) {
          return res.status(200).json({
            success: true,
            message: "Add successfully!",
          });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  };
}
module.exports = new ApiController();
