fs = require('fs');
fs.writeFile('D:\formproject\src\assets\images', 'Hello World!', function (err) {
  if (err) return console.log(err);
  console.log('Hello World > helloworld.txt');
});
