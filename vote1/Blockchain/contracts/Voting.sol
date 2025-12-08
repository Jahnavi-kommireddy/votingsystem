// Voting Contract: A decentralized voting system that allows users to 
                //     add candidates, cast votes, and reset the voting process. 
                //    The contract maintains candidate data and voter statuses, 
                //    ensuring secure and transparent election management.


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates; //candidate store
    mapping(address => bool) public voters;       //store voters to track vote
    address[] public voterAddresses; // Store the addresses of voters
    uint public candidatesCount;     
    string public electionName;
    bool public votingActive;
    address public owner;       

    event VotedEvent(uint indexed candidateId);
    event VotingResetEvent();

    constructor(string memory _electionName) {
        electionName = _electionName;
        votingActive = true;
        owner = msg.sender;
    }
    //modifier to check voting status
    modifier onlyDuringVoting() {
        require(votingActive, "Voting is not active.");
        _;
    }
    //modifier to check contract owner
    modifier onlyOwner(){
        require(msg.sender == owner,"You are not the Owner");
        _;
    }
    //function to add candidate for voting, can be caled only by owner
    function addCandidate(string memory _name) public 
    onlyOwner{
        require(votingActive, "Cannot add candidates after voting has ended.");
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
    //function to vote for candidates
    function vote(uint _candidateId) public onlyDuringVoting {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID.");

        voters[msg.sender] = true; // Mark the voter
        voterAddresses.push(msg.sender); // Track the voter
        candidates[_candidateId].voteCount++;

        emit VotedEvent(_candidateId);
    }

    //function to reset voting can be called only by owner
    function resetVoting() public onlyOwner{
        // Reset the candidate structure
        for (uint i = 1; i <= candidatesCount; i++) {
           delete candidates[i]; // Reset each candidate's vote count
        }

        // Reset the voters mapping
        for (uint j = 0; j < voterAddresses.length; j++) {
            voters[voterAddresses[j]] = false; // Mark each voter as having not voted
        }

        // Clear the list of voter addresses
        delete voterAddresses;

        votingActive = true; // Re-enable voting
        candidatesCount = 0;
        emit VotingResetEvent();
    }

    //function to end voting can be called only by owner
    function endVoting() public onlyOwner{
        votingActive = false;
    }

    //function to get results, can be called by owner
    function getResults() public onlyOwner view returns (Candidate[] memory, uint winnerId) 
    {
        Candidate[] memory result = new Candidate[](candidatesCount);
        uint winningVoteCount = 0;

        for (uint i = 1; i <= candidatesCount; i++) {
            result[i - 1] = candidates[i];
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winnerId = candidates[i].id;
            }
        }
        return (result, winnerId);
    }
}

//0x5FbDB2315678afecb367f032d93F642f64180aa3
//0x5FbDB2315678afecb367f032d93F642f64180aa3