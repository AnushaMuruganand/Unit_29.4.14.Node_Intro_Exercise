const fs = require('fs');
const axios = require('axios');

function cat(path) {
    
  fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
          console.log(`Error reading ${path}:\n ${err}`);
          process.exit(1);
      }

      handleOutput(data, outputFilePath);

  })
}

async function webCat(url) {
  try {
      const res = await axios.get(url);
      handleOutput(res.data, outputFilePath);
  }
  catch (err) {
      console.log(`Error fetching ${url}:\n ${err}`)
  }
}

/** handle output: write to file if "--out" given as command line argument*/
function handleOutput(data, outputFilePath) {
    if (outputFilePath) {
      fs.writeFile(outputFilePath, data, 'utf8', function(err) {
        if (err) {
          console.error(`Couldn't write ${outputFilePath}:\n ${err}`);
          process.exit(1);
        }
      });
    } else {
      console.log(data);
    }
  }
  
// calling the functions by passing in the command line argument based on whether its a PATH or URL and whether "--out" given
let path;
let outputFilePath;

if (process.argv[2] === "--out") {
    outputFilePath = process.argv[3];
    path = process.argv[4];
}
else {
    path = process.argv[2];
}


if (path.slice(0, 4) === 'http') {
  webCat(path);
}
else {
  cat(path);
}