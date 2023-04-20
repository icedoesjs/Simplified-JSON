const SJ = require('sj-json');
const simplified_json = new SJ();

let parsed = simplified_json.parse('filename.sj');

// This will output the SJ parsed to JSON
console.log(parsed)
