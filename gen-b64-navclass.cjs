const fs = require('fs');
const js = fs.readFileSync('c:\\Users\\Zhang\\Documents\\Halo\\WarmIsland\\check-navbar-class.js', 'utf8');
console.log(Buffer.from(js).toString('base64'));
