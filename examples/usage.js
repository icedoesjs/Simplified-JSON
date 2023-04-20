const SJ = require('sj-json');
const simplified_json = new SJ();

// The second argument is the parse function is where the txt files you require are located.
let parsed = simplified_json.parse('filename.sj', '');

// This will output the SJ parsed to JSON.
console.log(parsed)
