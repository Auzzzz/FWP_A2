// Check the image is supported, if so return true
function imgVal(img) {
  // Get the file type from the image
  var filetype = img.type.split("/").pop().toLowerCase();

  // go through and check if the file type is a supported image
  if (filetype != "jpg" && filetype != "jpeg" && filetype != "png") {
    return false;
  }
  return true;
}

// Check the image does not excide a size
function imgSize(img) {
  // get the size in kilobytes (KB)
  var size = img.size;

  // set the limit to 50KB
  if (size > 50000) {
    return false;
  }
  return true;
}
// take the date given to us from MYSQL and format it into a readable format
// this just returns the date in dd/mm/yyyy
function dateFormatter(date) {
  var fDate = new Date(date);

  return fDate.getDate() + "/" + fDate.getMonth() + "/" + fDate.getFullYear();
}
// take the date given to us from MYSQL and format it into a readable format
// this just returns the date in mm:hh dd/mm/yyyy
function dateTimeFormatter(date) {
  var fDate = new Date(date);

  return (
    fDate.getHours() +
    ":" +
    fDate.getMinutes() +
    " " +
    fDate.getDate() +
    "/" +
    fDate.getMonth() +
    "/" +
    fDate.getFullYear()
  );
}

export { imgVal, imgSize, dateFormatter, dateTimeFormatter };
