const { ethers, JsonRpcProvider } = require('ethers');
require('dotenv').config();
const contractABI = require('../abi/VotingContractABI.json');

console.log(process.env.RPC_NODE_URL);
// Set up wallet and provider
const provider = new JsonRpcProvider(process.env.RPC_NODE_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const voterWallet = new ethers.Wallet(process.env.VOTER_PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI.abi, wallet);
 // Get contract instance connected with voter's wallet
 const Votercontract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI.abi, voterWallet);


// Controller function to get the election name
const getElectionName = async (req,res) => {
    try {
        const electionName = await contract.electionName(); // Adjust this if your method is different
        res.json({ electionName });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error retrieving election name"});
    }
};


const addCandidate = async (req,res) => {
    try {
        const candidateName = req.query.candidateName;
        
        // Call the contract's addCandidate method
        const transaction = await contract.addCandidate(candidateName);
        
        // Wait for the transaction to be mined
        const receipt = await transaction.wait();
        
        res.json({ message: 'Candidate Added Successfully', transaction: receipt });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error occured while adding candidate"});
    }
};

const vote = async (req,res) => {
    try {
        const candidateId = req.query.candidateId;
        console.log("Can",candidateId);
        // Call vote function with the voter's wallet
        const tx = await Votercontract.vote(candidateId);

        // Wait for transaction to be mined
        const receipt = await tx.wait();

        res.json({message: "Your Vote Added Successfully",transactionHash: receipt.hash});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error Occured While Adding Vote"});
    }
};

const getResults = async (req,res) => {
    try {
        const [candidates, winnerId] = await contract.getResults(); // Call contract method

        // Convert candidates array for JSON compatibility
        const candidateResults = candidates.map(candidate => ({
          id: candidate.id.toString(),
          name: candidate.name,
          voteCount: candidate.voteCount.toString(),
        }));
    
        // Respond with results
        res.json({ 
          message: 'Voting Result Processed Successfully', 
          candidates: candidateResults,
          winnerId: winnerId.toString() 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error Occured While Getting Results Of The Vote System"});
    }
};

const resetVoting = async (req,res) => {
    try {
       // Call resetVoting function on the contract
       const transaction = await contract.resetVoting(); 

       // Wait for the transaction to be mined
        receipt = await transaction.wait();

       // Respond with success message and transaction details
       res.json({ 
           message: 'Voting has Reset Successfully', 
           transactionHash: receipt.hash 
       });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error Occured While Reseting The Vote System"});
    }
};

const endVoting = async (req,res) => {
    try {
       // Call resetVoting function on the contract
        const transaction = await contract.endVoting(); 

        // Wait for the transaction to be mined
         receipt = await transaction.wait();

        // Respond with success message and transaction details
        res.json({ 
            message: 'Voting has Ended Successfully', 
            transactionHash: receipt.hash 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error Occured While Ending The Vote System"});
    }
};

module.exports = {
    getElectionName,
    addCandidate,
    vote,
    getResults,
    resetVoting,
    endVoting,
};