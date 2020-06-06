var express = require("express"),
  app = express.Router();

app.post("/v1/uploadImage", (req, res) => {
  var imgdatetimenow = Date.now();
  var form = new formidable.IncomingForm({
    uploadDir: __dirname + "/public/app/upload/images",
    keepExtensions: true,
  });

  form.on("end", function () {
    res.end();
  });

  form.parse(req, (err, fields, files) => {
    var data = {
      username: fields.username,
      userAvatar: fields.userAvatar,
      repeatMsg: true,
      hasFile: fields.hasFile,
      isImageFile: fields.isImageFile,
      istype: fields.istype,
      showme: fields.showme,
      dwimgsrc: fields.dwimgsrc,
      dwid: fields.dwid,
      serverfilename: baseName(files.file.path),
      msgTime: fields.msgTime,
      filename: files.file.name,
      size: bytesToSize(files.file.size),
    };
    var image_file = {
      dwid: fields.dwid,
      filename: files.file.name,
      filetype: fields.istype,
      serverfilename: baseName(files.file.path),
      serverfilepath: files.file.path,
      expirytime: imgdatetimenow + 3600000 * expiryTime,
    };
    files_array.push(image_file);
    ios.sockets.emit("new message image", data);
  });
});

// route for uploading audio asynchronously
app.post("/v1/uploadAudio", (req, res) => {
  var userName,
    useravatar,
    hasfile,
    ismusicfile,
    isType,
    showMe,
    DWimgsrc,
    DWid,
    msgtime;
  var imgdatetimenow = Date.now();
  var form = new formidable.IncomingForm({
    uploadDir: __dirname + "/public/app/upload/music",
    keepExtensions: true,
  });

  form.on("end", () => {
    res.end();
  });
  form.parse(req, function (err, fields, files) {
    console.log("files : ", files);
    console.log("fields : ", fields);
    var data = {
      username: fields.username,
      userAvatar: fields.userAvatar,
      repeatMsg: true,
      hasFile: fields.hasFile,
      isMusicFile: fields.isMusicFile,
      istype: fields.istype,
      showme: fields.showme,
      dwimgsrc: fields.dwimgsrc,
      dwid: fields.dwid,
      serverfilename: baseName(files.file.path),
      msgTime: fields.msgTime,
      filename: files.file.name,
      size: bytesToSize(files.file.size),
    };
    var audio_file = {
      dwid: fields.dwid,
      filename: files.file.name,
      filetype: fields.istype,
      serverfilename: baseName(files.file.path),
      serverfilepath: files.file.path,
      expirytime: imgdatetimenow + 3600000 * expiryTime,
    };
    files_array.push(audio_file);
    ios.sockets.emit("new message music", data);
  });
});

// route for uploading document asynchronously
app.post("/v1/uploadPDF", (req, res) => {
  var imgdatetimenow = Date.now();
  var form = new formidable.IncomingForm({
    uploadDir: __dirname + "/public/app/upload/doc",
    keepExtensions: true,
  });

  form.on("end", () => {
    res.end();
  });
  form.parse(req, function (err, fields, files) {
    var data = {
      username: fields.username,
      userAvatar: fields.userAvatar,
      repeatMsg: true,
      hasFile: fields.hasFile,
      isPDFFile: fields.isPDFFile,
      istype: fields.istype,
      showme: fields.showme,
      dwimgsrc: fields.dwimgsrc,
      dwid: fields.dwid,
      serverfilename: baseName(files.file.path),
      msgTime: fields.msgTime,
      filename: files.file.name,
      size: bytesToSize(files.file.size),
    };
    var pdf_file = {
      dwid: fields.dwid,
      filename: files.file.name,
      filetype: fields.istype,
      serverfilename: baseName(files.file.path),
      serverfilepath: files.file.path,
      expirytime: imgdatetimenow + 3600000 * expiryTime,
    };
    files_array.push(pdf_file);
    ios.sockets.emit("new message PDF", data);
  });
});

// route for checking requested file , does exist on server or not
app.post("/v1/getfile", (req, res) => {
  var data = req.body.dwid;
  var filenm = req.body.filename;
  var dwidexist = false;
  var req_file_data;

  for (var i = 0; i < files_array.length; i++) {
    if (files_array[i].dwid == data) {
      dwidexist = true;
      req_file_data = files_array[i];
    }
  }

  // CASE 1 : File Exists
  if (dwidexist == true) {
    //CASE 2 : File Expired and Deleted
    if (req_file_data.expirytime < Date.now()) {
      var deletedfileinfo = {
        isExpired: true,
        expmsg: "File has beed removed.",
      };
      fs.unlink(req_file_data.serverfilepath, function (err) {
        if (err) {
          return console.error(err);
        }
        res.send(deletedfileinfo);
      });
      var index = files_array.indexOf(req_file_data);
      files_array.splice(index, 1);
    } else {
      // CASE 3 : File Exist and returned serverfilename in response
      var fileinfo = {
        isExpired: false,
        filename: req_file_data.filename,
        serverfilename: req_file_data.serverfilename,
      };
      res.send(fileinfo);
    }
  } else {
    // CASE 4 : File Doesn't Exists.
    var deletedfileinfo = {
      isExpired: true,
      expmsg: "File has beed removed.",
    };
    res.send(deletedfileinfo);
  }
});

module.exports = app;
