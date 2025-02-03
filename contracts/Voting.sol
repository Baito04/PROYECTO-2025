pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;
    mapping(address => bool) public voters;

    event votedEvent(uint indexed _candidateId);

    constructor() {
        addCandidate("Candidato 1");
        addCandidate("Candidato 2");
    }

    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        require(!voters[msg.sender], "Ya has votado.");
        require(_candidateId > 0 && _candidateId <= candidatesCount, unicode"Candidato no válido");

        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        emit votedEvent(_candidateId);
    }
}