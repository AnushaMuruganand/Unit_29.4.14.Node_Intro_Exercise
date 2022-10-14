const fs = require('fs');

function cat(path) {
    
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}:\n ${err}`);
            process.exit(1);
        }

        console.log(data);

    })
}

// calling the function by passing in the command line argument
cat(process.argv[2]);

// Exporting
module.exports = {
    cat : cat
}