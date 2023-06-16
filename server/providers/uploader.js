const uploadFile = require("./config/upload");

const fs = require("fs");

const upload = async (req, res) => {
  try {
    await uploadFile.uploadFileMiddleware(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: ",
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file:. ${err}`,
    });
  }
};

const uploadMultiple = async (req, res) => {
  try {
    await uploadFile.uploadFilesMultiple(req, res);

    if (req.files == undefined) {
      return res.status(400).send({ message: "Please upload a files!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: ",
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file:. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  uploadMultiple,
  getListFiles,
  download,
};
