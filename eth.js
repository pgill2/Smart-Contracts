// This code will interact with the smart conttract Metacoin deployed on Binance smart chain test network

var ethers = require('ethers');
url='https://data-seed-prebsc-1-s1.binance.org:8545';
var provider = new ethers.providers.JsonRpcProvider(url);
const abi= [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"internalType":"bool","name":"sufficient","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
const contractAddress = '0xeCD79Ae3bdfd64Cc2d1F2818fb89f064101021ca';
const contract = new ethers.Contract(contractAddress,abi, provider);
const privateKey1 = Buffer.from('28cb0c47222b04844efb8036536c94096e7d683a30790748e5fe5f960b640fe3','hex');
async function interact()
{
    const bal= await contract.getBalance('0x87D924F3461754cb006feBB7c4758b27C692CA4C');
    console.log(bal.toNumber());
    const wallet = new ethers.Wallet(privateKey1, provider);
    const contractWithWallet = contract.connect(wallet)
    const account2='0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2';
    const tx = await contractWithWallet.sendCoin(account2, 200)
    await tx.wait()
    console.log(tx)
}
interact();