const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const {getPublicKeyFromSignature, hashMessage } = require("./scripts/firma");

app.use(cors());
app.use(express.json());

const balances = {
  "033a1d9fd6ae283554610b8e7a6a5fb8383765a5ad9422ce6d0ba9bdd6f911ce8f": 100,
  "02e03e54c8137a234f35b6cc10580d8d94a7e62bbe7805ffcb8f76425be316c24f": 100,
  "03fb67d17de728521008c427066a2d075b24bede0fefe2509ce273e631ae437086": 100,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});


app.post("/send", (req, res) => {

  const { sender, recipient, amount, signature} = req.body;

  if(!recipient) res.status(400).send({ message: "recipient was not provided" });
  if(!amount) res.status(400).send({ message: "amount was not provided" });
  if(!sender) res.status(400).send({ message: "sender was not provided" });
  if(!signature) res.status(404).send({ message: "signature was not provided"});
  //if(!recovery) res.status(400).send({ message: "recovery was not provided" });

  const msg={sender: sender,recipient,amount:parseInt(amount)};
  const msgHash=hashMessage(msg);
  const PK=getPublicKeyFromSignature(signature.compactHex,msg,signature.recovery).hex;




  if(PK!==sender){
    res.status(400).send({ message: PK+"_"+sender.toString() });
  }
  else{
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
}
});


app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
