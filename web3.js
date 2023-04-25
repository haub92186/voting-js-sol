const Web3 = require('web3');
const Contract = require('@truffle/contract');

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(provider);

const votingContractJson = require('./build/contracts/Voting.json');
const votingContract = Contract(votingContractJson);
votingContract.setProvider(provider);

const candidate1 = web3.utils.asciiToHex('Candidate 1');
const candidate2 = web3.utils.asciiToHex('Candidate 2');

async function main() {
  const accounts = await web3.eth.getAccounts();
  const contract = await votingContract.deployed();
  const account = accounts[0];

  // Example of voting for candidate 1
  await contract.vote(candidate1, { from: account });
  const voteCount = await contract.getVoteCount(candidate1);
  console.log(`Candidate 1 has ${voteCount} votes.`);

  // Example of voting for candidate 2
  await contract.vote(candidate2, { from: account });
  const voteCount2 = await contract.getVoteCount(candidate2);
  console.log(`Candidate 2 has ${voteCount2} votes.`);
}

main();
