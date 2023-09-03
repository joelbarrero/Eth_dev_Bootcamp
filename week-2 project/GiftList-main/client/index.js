const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {

  const name = process.argv[2] || "Sidney Kertzmann"
  const tree= new MerkleTree(niceList);
  let index=0
  
  for(let i=0;i<niceList.length;i++){
    if(niceList[i]===name){
      index=i;
    }
  }// TODO: how do we prove to the server we're on the nice list? 

  const proof=tree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {name,proof
    // TODO: add request body parameters here!
  });

  console.log({ gift });
}

main();