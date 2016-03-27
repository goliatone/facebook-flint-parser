var fs = require('fs');
var sortBy = require('lodash.sortby');
var flint = require('./out/flint.json');

var sorted = sortBy(flint, 'status_message');
console.log(sorted.length);

sorted.forEach(function(item){
    var entry = item.status_message;
    console.log(entry);
});
