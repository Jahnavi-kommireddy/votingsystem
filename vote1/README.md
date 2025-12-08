# bbn-Voting

A Blockchain-based Voting System that provides a decentralized, secure, and transparent platform for conducting elections. By leveraging Blockchain’s immutability and cryptographic security, this system ensures that votes are cast, recorded, and counted without the risk of fraud or tampering. 

# To run the project
## Blockchain
 - $ cd Blockchain
 - $ npm i
 - Complete the Blockchain/env
 - Follow .\Blockchain\README.md for deployment of contract

## API
 - $ cd API-Gateway
 - $ npm i
 - Complete the API-Gateway/env
 - For Contract ABI
    - Copy Abi from Blockchain\artifacts\contracts\Voting.sol\Voting.json
    - Paste to API-Gateway\abi\VotingContractABI.json
 - $ node server.js



## To Run API

1. Get Voting Name:
   -  http://localhost:3000/api/blockchain/electionName
   - Respose: 
        {
            "electionName": "Voting Contract"
        }

2. Add Candidate
    - http://localhost:3000/api/blockchain/addCandidate?candidateName=Alice
    - Response
        {
            "message": "Candidate Added Successfully",
            "transaction": {
                "_type": "TransactionReceipt",
                "blockHash": "0xf6cc0216c1e21f33aca50bd0de02759240a4568cbc6142a024bfa83eef680121",
                "blockNumber": 716210,
                "contractAddress": null,
                "cumulativeGasUsed": "94631",
                "from": "0xD18B28d88fc745c7c6Ae5eea463b27D669177C0F",
                "gasPrice": "10000000000",
                "blobGasUsed": null,
                "blobGasPrice": null,
                "gasUsed": "94631",
                "hash": "0xd78b70166cb4eacdbec68df5bd897c4ff5fa7e6b9d5f293c2702f87cfc4a5b27",
                "index": 0,
                "logs": [],
                "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                "status": 1,
                "to": "0x97695dEBd186E664f417a971e9fAA6E1f44874f0"
            }
        }

3. To Vote
    - http://localhost:3000/api/blockchain/Vote?candidateId=1
    - Response
        {
            "message": "Your Vote Added Successfully",
            "transactionHash": 0x5FbDB2315678afecb367f032d93F642f64180aa3
        }

4. To Get Results
    - http://localhost:3000/api/blockchain/getResults
    - Response
        {
            "message": "Voting Result Processed Successfully",
            "candidates": [
                {
                    "id": "1",
                    "name": "Alice",
                    "voteCount": "1"
                }
            ],
            "winnerId": "1"
        }

5. To Reset Voting
    - http://localhost:3000/api/blockchain/resetVoting
    - Response
        {
            "message": "Voting has Reset Successfully",
            "transactionHash": "0xb6d2c4d48dbcff3d3b0106298ef9084bd5ec63f4419cf4a6532e9ce07d88aa55"
        }

6. To End Voting
    - http://localhost:3000/api/blockchain/endVoting
    - Response
        {
            "message": "Voting has Ended Successfully",
            "transactionHash": "0x8154af7c98ce56d4a3c8796773d577d34e093786cc6ad61d6490e1aff57ee069"
        }