var fs = require('fs');
var sortBy = require('lodash.sortby');
var flint = require('./out/flint.json');

var sorted = sortBy(flint, 'status_message');
console.log(sorted.length);

var categories = {};

sorted.forEach(function(item){
    var entry = item.status_message;
    var entry = item.status_message; //.replace(/E./,'E').replace(/N./,'N').replace(/S./,'S').replace(/W./,'W').replace(/Mt/,'Mt');
    var myRegexp = /^([911\sA-Z]+)([-:;])(.*?)([-.])(.*?)#(.*?)$/m;
    var match = myRegexp.exec(entry);
    if(!match) return;

    var obj = {};
    obj.complaint = match[1];
    obj.address = match[3];
    obj.description = match[5];
    obj.township = match[6];
    obj.timestamp = item.status_published;
    obj.id = item.status_id;
    obj.numComments = item.num_comments;
    obj.numLikes = item.num_likes;

    var label = normalizeLabel(obj.complaint);
    if(!categories.hasOwnProperty(label)) categories[label] = 0;
    ++categories[label];
    // if(!categories.hasOwnProperty(label)) categories[label] = [];
    // categories[label].push(obj);
});

console.log(Object.keys(categories).length);

// Object.keys(categories).map(function(cat){
//     fs.writeFileSync('./out/' + cat + '.json', JSON.stringify(categories[cat]), 'utf-8');
// });


function normalizeLabel(label){
    label = label.toLowerCase();
    label = label.replace(/\s/g, '_');
    label = label.replace(/'/g, '');
    return label.trim();
}
