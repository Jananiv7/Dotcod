var fs = require('fs');
fs.writeFile('D:\jwtproject\images', '', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
  });