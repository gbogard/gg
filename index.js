#!/usr/bin/env node

var exec = require('exec');
var path = require('path');
var multiLineText = require('./lib/multiLineText');
var playSound = require('./lib/playSound');

var ggPath = path.dirname(process.argv[1]);
var arguments = process.argv.slice(2);
var fullCommand = (function (arguments) {
  var newArray = arguments.slice(0);
  newArray.unshift('git');
  return newArray;
})(arguments);

var playRandomCheer = function () {
  var cheers = [
    './wavs/cheer1.wav',
    './wavs/cheer2.wav',
    './wavs/cheer3.wav'
  ];
  var sound = cheers[Math.floor(Math.random() * cheers.length)];
  return playSound(path.resolve(ggPath, sound));
}

exec(fullCommand, function (err, out, code) {
  if (err) {
    process.stdout.write(err);
    process.exit(code);
  }
  else {
    console.log('ok');
    if (arguments[0] === 'push') {
      multiLineText('Congrats!!');
        multiLineText('You are fucking awesome!', {
          font: 'mini',
        });
      playRandomCheer().then(function () {
        process.stdout.write(out);
        process.exit(code);
      }, function () {
        process.stdout.write(out);
        process.exit(code);
      });
    }
    else {
      process.stdout.write(out);
      process.exit(code);
    }
  }
});