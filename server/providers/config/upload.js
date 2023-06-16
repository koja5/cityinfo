const util = require("util");
const multer = require("multer");
const maxSize = 10 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(__dirname);
    cb(null, __dirname + "../../../../client/src/assets/file_upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let storageMultiple = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(__dirname);
    cb(null, __dirname + "../../../../client/src/assets/file_upload/gallery");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFiles = multer({
  storage: storageMultiple
}).array("files");

let uploadFileMiddleware = util.promisify(uploadFile);
let uploadFilesMultiple = util.promisify(uploadFiles);
module.exports = { uploadFileMiddleware, uploadFilesMultiple };
