var express =require('express');
var BnbManager =require("./src/centerpirme.js").BnbManager;
var cors =require('cors');
// var mysql =require('mysql');
var dotenv =require('dotenv');
dotenv.config()



const app = express(),
      port = 3082;

// place holder for the data
const users = [];
app.use(cors())
app.use(express.json());
var bnbManager = new BnbManager(process.env.infraUrl);

app.post('/ETHapi/createWallet', (req, res) => {
  console.log("post /ETHapi/createWallet");
  let response = bnbManager.createAccount();
  res.json(response);
});

app.post('/ETHapi/hello', (req, res) => {
  console.log("post /ETHapi/hello");
  res.json("hello");
});

// app.post('/ETHapi/tokenBalance', async function(req,res) {
//   try {
//     const address = req.body.address;
//     const tokenContractAddress = req.body.tokenAddress;
//     let balance = await bnbManager.getBEPTokenBalance(tokenContractAddress,address)
//     // console.log(balance);
//     console.log("post /ETHapi/tokenBalance");
//     res.json({balance : balance});
//   } catch(e) {
//      return res.status(401).send({
//       message : e.message
//    });
//   }
// });
app.post('/ETHapi/USDTBalance', async function(req,res) {
  try {
    const address = req.body.address;
    const tokenContractAddress = process.env.USDTAddress;
    let balance = await bnbManager.getBEPTokenBalance(tokenContractAddress,address)
    // console.log(balance);
    console.log("post /ETHapi/USDTBalance");
    res.json({balance : balance});
  } catch(e) {
     return res.status(401).send({
      message : e.message
   });
  }
});

// app.post('/ETHapi/sendEth', async function(req,res) {
//   try {
//   //   const keystore = req.body.keystore;
//   //   const password = req.body.password;
//     const privateKey = req.body.privateKey;
//     const toAddress = req.body.toAddress;
//     const amount = req.body.amount;
//     // console.log("privateKey:", privateKey, "toAddress:", toAddress, "amount:", amount)
//     let result = await bnbManager.sendBNB(privateKey,toAddress,amount,3)
//     console.log(result);
//     res.json({hash:result});
//   } catch(e) {
//      return res.status(401).send({
//       message : e.message
//    });
//   }
// });
// app.post('/ETHapi/sendToken', async function(req,res) {
//   try {
//     console.log("post /ETHapi/sendToken");
//     const privateKey = req.body.privateKey;
//     const tokenContractAddress = req.body.tokenContractAddress;
//     const toAddress = req.body.toAddress;
//     const amount = req.body.amount;
//     let result = await bnbManager.sendToken(privateKey,tokenContractAddress,toAddress,parseFloat(amount),3)
    
//     res.json({hash : result.transactionHash});
//   } catch(e) {
//     console.log(e)
//      return res.status(401).send({
//       message : e.message
//    });
//   }
// });
app.post('/ETHapi/sendUSDT', async function(req,res) {
  try {
    console.log("post /ETHapi/sendToken");
    const privateKey = req.body.privateKey;
    const tokenContractAddress = process.env.USDTAddress;
    const toAddress = req.body.toAddress;
    const amount = req.body.amount;
    let result = await bnbManager.sendToken(privateKey,tokenContractAddress,toAddress,parseFloat(amount),3)
    
    res.json({hash : result.transactionHash});
  } catch(e) {
    console.log(e)
     return res.status(401).send({
      message : e.message
   });
  }
});

// app.post('/ETHapi/getEthBalance', async function(req,res) {
//   try {
//     console.log("post /ETHapi/getEthBalance");
//     const address = req.body.address;
   
//     let result = await bnbManager.getBnbBalance(address)
    
//     res.json({balance : result});
//   } catch(e) {
//     console.log(e)
//      return res.status(401).send({
//       message : e.message
//    });
//   }
// });

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});