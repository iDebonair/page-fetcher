const fs = require('fs');
const http = require('http');

const url = process.argv[2]; // this will contain the url that will be passed into the code
const filePath = process.argv[3]; // this will contain the file path which is .index.html

const downloadResource = (url, filePath) => {
  http.get(url, (response) => { //initiate the get method to request resource from the url
    let data = '';
    let fileSize = 0;

    response.on('data', (chunk) => {
      data += chunk;
      fileSize += chunk.length;
    });

    // Print out the data size and write it to the local fime
    response.on('end', () => {
      fs.writeFile(filePath, data, (err) => { 
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
      });
    });
  }).on('error', (err) => {
    console.error('Error: Failed to download resource:', err);
    process.exit(1);
  });
};

downloadResource(url, filePath);
