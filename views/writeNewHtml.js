import * as fs from "fs";

function newHtml(tokenId , hash, base) {
  // Read index.html file
  const indexHtml = fs.readFileSync(`./views/${base}.html`, 'utf8');
  // Replace '0x0' with `${hash}`
  const modifiedCode = indexHtml.replace(/0x0/g, hash);

  // Replace 'let tokenId = 0;' with 'let tokenId = tokenId;'
  const finalCode = modifiedCode.replace(/let tokenId = 0;/g, `let tokenId = ${tokenId};`);

  // Replace sketch2.js with sketch${tokenId}.js

  // Write modified HTML to new file
  let filename;
  if ( base == 'token' ) {
    filename = `./views/${tokenId}.html`;
    console.log(`New HTML file ${tokenId}.html created.`);
  } else {
    filename = `./views/${base}_${tokenId}.html`;
    console.log(`New HTML file ${base}_${tokenId}.html created.`);
  }
  
  fs.writeFileSync(filename, finalCode);
  
}



// Example usage: newHtml(123);
export { newHtml}