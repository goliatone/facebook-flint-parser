var fs = require('fs');
var parse = require('csv-parse');

var map = {
  'status_id': 0,
  'status_message': 1,
  'status_published': 5,
  'num_likes': 6,
  'num_comments': 7
};
var output = [];
// Create the parser
var parser = parse({delimiter: ','});
// Use the writable stream api
parser.on('readable', function(){
  var record, item;
  while (record = parser.read()) {
      item = {};
      Object.keys(map).forEach(function(key){
        item[key] = record[map[key]];
      });
      output.push(item);
  }
});

// Catch any error
parser.on('error', function(err){
  console.log(err.message);
});

// When we are done, test that the parsed output matched what expected
parser.on('finish', function(){
    // console.log(JSON.stringify(output));
    fs.writeFileSync('./out/flint.json', JSON.stringify(output), 'utf-8');
    console.log('done');
});


// var outStream = fs.createWriteStream('./out/flint.json');

fs.createReadStream('./data/flintpoliceops_facebook_statuses.csv')
  .pipe(parser);
