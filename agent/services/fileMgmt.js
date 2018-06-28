var fs = require('fs');

exports.findFiles = function(path) {
  return new Promise(function(resolve, reject){
    fs.readdir(path, function(err, response){
      if(err) reject('Problem fetching files: ' + err);
      // TODO get only TDs
      resolve(response);
    });
  });
}

exports.read = function(file){
  return new Promise(function(resolve, reject){
    fs.readFile(file, 'utf8', function(err, response){
      if (err) reject('Problem writing file: ' + err);
        resolve(response);
    });
  });
}

exports.write = function(file){
  return new Promise(function(resolve, reject){
    fs.writeFile(file, 'utf8', function(err){
      if (err) reject('Problem writing file: ' + err);
        resolve('The file has been saved!');
    });
  });
}
