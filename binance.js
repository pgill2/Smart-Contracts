const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const Common = require('ethereumjs-common').default;

const customCommon = Common.forCustomChain(
    
    'mainnet',{
      name: 'binance smart testnet',
      networkId: 97,
      chainId: 97
    },
    'petersburg'
  )

const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
const abi= [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"internalType":"bool","name":"sufficient","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
const contractAddress = '0xeCD79Ae3bdfd64Cc2d1F2818fb89f064101021ca';
const contract = new web3.eth.Contract(abi, contractAddress);
var account1 = '0x87D924F3461754cb006feBB7c4758b27C692CA4C'
const privateKey1 = Buffer.from('28cb0c47222b04844efb8036536c94096e7d683a30790748e5fe5f960b640fe3','hex');


async function sendtx() {
    
    const bal=await contract.methods.getBalance('0x87D924F3461754cb006feBB7c4758b27C692CA4C').call();
    console.log('balalnce is'+bal);
    
    let  txCount=await web3.eth.getTransactionCount(account1);
    var add='0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2';
    
    
    //var add='0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'
    
    
    
    const myData = contract.methods.sendCoin(add,web3.utils.toHex(200)).encodeABI();
        
        const txObject = {
        nonce:web3.utils.toHex(txCount),
        to:contractAddress,
        gasLimit:web3.utils.toHex(210000),
        gasPrice: web3.utils.toHex(67 * 1e9), 
        value:0,
        data:myData,
        }
        console.log(txObject);
        const tx = new Tx(txObject, {common:customCommon} );
        tx.sign(privateKey1);

        const serializedTransaction = tx.serialize()
        const raw = '0x'+serializedTransaction.toString('hex')

        web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
        //console.log(err);
        console.log(txHash);
        })
        txCount++;

    
    
}

sendtx();