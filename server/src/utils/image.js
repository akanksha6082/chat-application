const bytesToSize = (bytes) => {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "n/a";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  if (i == 0) return bytes + " " + sizes[i];
  return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
};

const baseName = (str) => {
  var base = new String(str).substring(str.lastIndexOf("/") + 1);
  return base;
};
// const routine_cleanup = () => {
//   for (var i = 0; i < files_array.length; i++) {
//     if (Date.now() > files_array[i].expirytime) {
//       fs.unlink(files_array[i].serverfilepath, function (err) {
//         if (err) {
//           return console.error(err);
//         }
//       });
//       files_array.splice(i, 1);
//     }
//   }
// };

module.exports = {
  bytesToSize,
  baseName,
  //   routine_cleanup,
};
