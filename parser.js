var transform = require('simple-csvtojson');

var outStream = fs.createWriteStream('./out/flint.json');

fs.createReadStream('./data/flintpoliceops_facebook_statuses.csv')
  .pipe(transform({
    delimiter: ',',
    map: {
      'status_id': 0,
      'status_message': 1,
      'status_published': 5,
      'num_likes': 6,
      'num_comments': 7
    },
    skipHeader: true
  }))
  // .pipe(process.stdout)
  .pipe(outStream);
