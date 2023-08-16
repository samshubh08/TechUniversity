const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("fdfd", file.mimetype.split("/")[1])
    let folder = null
    if(file.fieldname == "question_name"){
      folder = "./questions"
    }
    else{
      folder = ""
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
},
});

const upload = multer({ storage: storage });

module.exports = upload;