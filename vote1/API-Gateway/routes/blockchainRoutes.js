const express = require('express');
const router = express.Router();
const {
    getElectionName,
    addCandidate,
    vote,
    getResults,
    resetVoting,
    endVoting,
} = require('../controllers/blockchainController');

// Route to get election name
router.get('/electionName', getElectionName);
//Route to add candidate only by Owner
router.post('/addCandidate',addCandidate);
//Route to vote only by Owner
router.post('/vote',vote);
//Route to get the results of active voting only by Owner
router.post('/getResults',getResults);
//Route to ResetVoting only by Owner
router.post('/resetVoting',resetVoting);
//Route to EnVoting only by Owner
router.post('/endVoting',endVoting);


module.exports = router;