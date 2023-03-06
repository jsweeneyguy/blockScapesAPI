import {writeNewFiles} from "./views/createDistinctRenderFiles.js";
import {takeScreenshot} from "./views/takeScreenshot.js";
import {checkMinted} from "./checkMinted.js";
import express from "express";
import * as path from 'path';



const app = express();
const port = process.env.PORT || 1234;
const tokenRendered = {};
const imageRendered = {};

app.use(express.static(path.join('.', 'views')));
app.set('view engine', '.html');

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/:filepath' , async (req , res) => {
    let filepath = req.params.filepath;
    if (filepath > 1234 || filepath < 0 || (isNaN(filepath)) ) {
        res.send("Not a valid token Id")
    }
    const minted = await checkMinted(filepath);
    if (tokenRendered[filepath] != undefined ) {
        res.sendFile(`${filepath}.html`, { root: path.join('.', 'views') }); 
    } else if (tokenRendered[filepath] == undefined && minted == true ){
        res.send("refresh metadata, blockScape rendering...")
    } else if (tokenRendered[filepath] == undefined && minted == false ){
        res.send("blockScape not yet minted")
    }
});

app.get('/img/:tokenId' , (req , res) => {
    let tokenId = req.params.tokenId;
    if (tokenId > 1234 || tokenId < 0) {
        res.send("Not a valid token Id")
    }
    if (imageRendered[tokenId] == undefined) {
        res.sendFile(`69420.png`, { root: path.join('.', 'views') });
    } else {
        res.sendFile(`${tokenId}.png`, { root: path.join('.') });
    }
    
});

app.get( '/metadata/:tokenId' , async (req, res ) => {
    let tokenId = req.params.tokenId;
    if (tokenRendered[tokenId] == undefined && tokenId <= 1234) {
        let hash;
        await writeNewFiles(tokenId).then( (res) => { hash = res; });
        console.log(hash)
        if ( hash != 'failed' ) {
        takeScreenshot(tokenId);
        imageRendered[tokenId] = 'xD';
        //const peepo = saveHtmlAsPng( token);
        tokenRendered[tokenId] = 'xD';
        tokenRendered[`temp_${tokenId}`] = 'xD';
        tokenRendered[`token_${tokenId}`] = 'xD';
        }
        res.sendFile('69420.json', { root: path.join('.', 'views') });
    } else if (tokenRendered[tokenId] != undefined && tokenId <= 1234) {
        res.sendFile(`${tokenId}.json` , { root: path.join('.' , 'views') });
    } else {
        res.send("Not a valid tokenid")
    }
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });

console.log("test")
