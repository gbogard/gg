var shell = require('node-powershell');
var path = require('path');

module.exports = function (soundFile) {
  return new Promise(function (resolve, reject) {
    var ps = new shell({ executionPolicy: 'Bypass', debugMsg: false });
    ps.addCommand('(New-Object Media.SoundPlayer "'+path.resolve(soundFile)+'").PlaySync()')
      .then(function () {
        return ps.invoke();
      })
      .then(function (output) {
        ps.dispose();
        resolve();
      })
      .catch(function (err) {
        console.log(err);
        ps.dispose();
        reject();
      });
  })
}