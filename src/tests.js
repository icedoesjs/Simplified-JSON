const SJ = require('./parser.js');
const simple = new SJ(false);

let parsed = simple.parse('../examples/example.sj', '../examples')

console.log(parsed)