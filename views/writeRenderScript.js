import * as fs from "fs";

function newScript(tokenId, hash) {
  // Read script.js file
  const scriptCode = fs.readFileSync('./views/sketch.js', 'utf8');

  // Replace '0x0' with `${hash}`
  const modifiedCode = scriptCode.replace(/0x0/g, hash);

  // Replace 'let tokenId = 0;' with 'let tokenId = tokenId;'
  const finalCode = modifiedCode.replace(/let tokenId = 0;/g, `let tokenId = ${tokenId};`);

  // Write modified code to new file
  const filename = `./views/sketch${tokenId}.js`;
  fs.writeFileSync(filename, finalCode);
  console.log(`New script file ${filename} created.`);
}

function newImgScript(tokenId, hash) {
  // Read script.js file
  const scriptCode = fs.readFileSync('./views/sketchImg.js', 'utf8');

  // Replace '0x0' with `${hash}`
  const modifiedCode = scriptCode.replace(/0x0/g, hash);

  // Replace 'let tokenId = 0;' with 'let tokenId = tokenId;'
  const finalCode = modifiedCode.replace(/let tokenId = 0;/g, `let tokenId = ${tokenId};`);

  // Write modified code to new file
  const filename = `./views/sketchImg${tokenId}.js`;
  fs.writeFileSync(filename, finalCode);
  console.log(`New script file ${filename} created.`);
}



export { newScript , newImgScript};