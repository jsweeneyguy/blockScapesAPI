import {writeMetaData} from "./writeMetadataBase.js";
import {newHtml} from "./writeNewHtml.js";
import  Web3 from "web3";
import {abiJson} from "../data.js";


// Configure this to the network you deployed your contract to;


async function writeNewFiles(tokenId ) {
  // Your contract address from the dashboard
  const web3 = new Web3('https://goerli.infura.io/v3/0e7e7c844dbc4039b91a409a53242a8f');
  const contractInstance = new web3.eth.Contract(abiJson, "0xc2533c03ac6Aab14Cf5b879A9dbB3f2A8d06d50b");

  try {
    let num1;
    await contractInstance.methods.getMintHash(tokenId).call().then((res) => { num1 = res; });
  
    if (num1 != 0x0000000000000000000000000000000000000000000000000000000000000000  ) {
      console.log(num1)
      writeMetaData(tokenId , num1);
      newHtml(tokenId , num1 , 'temp');
      newHtml(tokenId , num1 , 'token');
      return num1 
      } else {
        console.log(num1)
        console.log('xD')
        return 'failed'
      }
  } catch (err) {
    console.log(err)
    return err 
  }
  

  // this string is appended to the script-string fetched from the contract.
  // it provides hash and tokenId as inputs to the script
};
 
export { writeNewFiles }

