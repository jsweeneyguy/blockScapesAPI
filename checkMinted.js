import  Web3 from "web3";
import {abiJson} from "./data.js";

async function checkMinted(tokenId) {
    const web3 = new Web3('https://goerli.infura.io/v3/0e7e7c844dbc4039b91a409a53242a8f');
    const contractInstance = new web3.eth.Contract(abiJson, "0xc2533c03ac6Aab14Cf5b879A9dbB3f2A8d06d50b");

    try {
        let num1;
        await contractInstance.methods.getMintHash(tokenId).call().then((res) => { num1 = res; });
      
        if (num1 != 0x0000000000000000000000000000000000000000000000000000000000000000  ) {
            return true;
        } else {
            return false;
        } 
    } catch (err) {
        console.log(err);
    }
    
}

export { checkMinted };