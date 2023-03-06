import * as fs from "fs";
import {ceil , floor, round} from 'mathjs';
function map(number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function writeMetaData(tokenId , hash) {

let numPal; //number of palettes between 1 and 18 (high #s take a while)
let simplePattern = false; //true for 1 Perlin noise; false combines 2 Perlin noises
let size, rA, gA, bA;
let array1 = [];
let factor = 0;
let alpha;
let t = 0;
let palette;
let c;
let rez1;
let rez2;
let z;
let sWeight;
let sF1;
let hypotheticalDeployment = 'https://api.blockscapes.xyz'
const metadataObject = { 
    'description' : "blockScapes are a series of 1234 dyanmic, on-chain generative art pieces rendered with p5.js. blockScapes do not loop but are continuously rendering in front of you for as long as you have them open, always leaving something be explored tomorrow. For more info, swing by our discord or reach out on twitter." ,
    'image' : hypotheticalDeployment + `/img/${tokenId}`,
    'name' : "blockScape #" + `${tokenId}`,
    'attributes' : [],
    'animation_url' : hypotheticalDeployment + `/${tokenId}`
    };
const hashPairs = [];
for (let j = 0; j < 32; j++) {
  hashPairs.push(hash.substring( 2 + (j * 2), 4 + (j * 2)));
}

// Parse the hash pairs into ints. Hash pairs are base 16 so "ec" becomes 236.
// Each pair will become a value ranging from 0 - 255
const decPairs = hashPairs.map(x => {
  return parseInt(x, 16);
});

numPal = ceil(map(decPairs[0], 0, 255, 1, 2));
rez1 = map(decPairs[1] , 0, 255, 0.001, 0.005);
rez2 = map(decPairs[2] , 0, 255, 0.003, 0.005);
sWeight = ceil(map(decPairs[3] , 0, 255, 1, 3));
c = map(decPairs[4] , 0, 255, 5, 10);
let colorPalettes = {};
colorPalettes['Color Palettes'] = [];
z = ceil(map(decPairs[5] , 0, 255, 1, 4))
  for (let k = 0; k < numPal; k++) {
    palette = floor(map(decPairs[6 + k] , 0, 255, 1, 678));
    let sF = 360 / (c);   
  array1.push(palette, sF,factor); //add palette and shift factor to array for each # of palettes
  colorPalettes['Color Palettes'].push(map(decPairs[5 + k] , 0, 255, 1, 678));
}
let attr_1 = {'trait_type' : 'Pixel Weight' ,
'value' : round(sWeight, 2) };
let attr_2 = {'trait_type' : 'Shift Factor' ,
'value' : round(c , 2) };
let attr_3 = {'trait_type' : 'Palette Count' ,
'value' : numPal };
let attr_4 = {'trait_type' : 'Color Palettes' ,
'value' :  colorPalettes['Color Palettes'] };

metadataObject['attributes'] = [ attr_1 , attr_2, attr_3, attr_4];

const jsonString = JSON.stringify(metadataObject);

fs.writeFile(`./views/${tokenId}.json`, jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
});

}

export { writeMetaData }