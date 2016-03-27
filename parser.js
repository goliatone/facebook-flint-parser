var parse = require('csv-parse');
var transform = require('stream-transform');
var combine = require('stream-combiner2');

module.exports = function(options) {
  if (!options) throw new Error('Options not specified');
  if (!options.map) throw new Error('Options.map not specified');

  options.delimiter = options.delimiter ? options.delimiter:  '\t';

  var finish = false;
  var parser = parse({delimiter: options.delimiter, quote: ''});
  parser.on('finish', function(){
    console.log('finishing', parser.count, parser.lines);

  });
  var headerPassed = false;

  var transformer = transform(function(record, callback){
    if (options.skipHeader && !headerPassed) {
      headerPassed = true;
      return callback(null, '[');
    }

    var item = {};
    Object.keys(options.map).forEach(function(key){
      item[key] = record[options.map[key]];
    });
    console.log('count', parser.count, parser.lines);
    callback(null, JSON.stringify(item) + ',\n');
  }, {parallel: 10});


  return combine([
    parser,
    transformer
  ]);
};
