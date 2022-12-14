const fs = require('fs');
const axios = require('axios');

function cat(path) {
    
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}:\n ${err}`);
            process.exit(1);
        }

        console.log(data);

    })
}

async function webCat(url) {
    try {
        const res = await axios.get(url);
        console.log(res.data);
    }
    catch (err) {
        console.log(`Error fetching ${url}:\n ${err}`)
    }
}

// calling the functions by passing in the command line argument based on whether its a PATH or URL 
let path = process.argv[2];

if (path.slice(0, 4) === 'http') {
  webCat(path);
}
else {
  cat(path);
}

