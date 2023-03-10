pragma solidity >= 0.5.0 < 0.7.0;
contract Election {
    // Read/write candidate
    //string public candidate;
    // Constructor
    constructor () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    mapping(uint => Candidate) public candidates; 
    mapping(address=>bool) public voters; 
    uint public candidatesCount;
    function addCandidate(string memory name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, name, 0);
    }
    function vote(uint _candidateId) public {
      require(!voters[msg.sender]);
      require(_candidateId > 0 && _candidateId <=candidatesCount);  
      voters[msg.sender]=true;
      candidates[_candidateId].voteCount ++;
      emit votedEvent(_candidateId);
    } 
   event votedEvent ( uint indexed _candidateId); 
}