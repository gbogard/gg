var figlet = require('figlet');

module.exports = function (text, opts) {
  var windowsWidth = process.stdout.columns;
  if (text.length * 3 > process.stdout.columns) {
    text = text.split(' ');
  }
  else {
    text = [text];
  }

  text.forEach(function (word) {
    console.log(figlet.textSync(word, opts));
  })
};