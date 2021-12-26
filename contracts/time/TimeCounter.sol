//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../modules/access/Ownable.sol";

contract TimeCounter is Ownable {

    event LastActionStamped(address actor, uint timestamp);
    event CounterRightChanged(address counter, uint right);

    uint public startTime; 
    mapping(address => uint) public lastActions; 
    mapping(address => uint) public counterRights;

    modifier onlyCounter() {
        require(counterRights[msg.sender] > 0, "TimeCounter: no right to stamp action");
        _;
    }

    constructor() {
        startTime = block.timestamp;
    }

    function getElapsedTimeOf(address actor) public view returns (uint) {
        uint lastAction = lastActions[actor];
        return lastAction == 0 ? block.timestamp - startTime : block.timestamp - lastAction;
    }

    function stampLastAction(address actor) public onlyCounter {
        lastActions[actor] = block.timestamp;
        emit LastActionStamped(actor, block.timestamp);
    }

    function _grantPermission(address counter) public onlyOwner {
        counterRights[counter] = 1;
        emit CounterRightChanged(counter, 1);
    }

    function _revokePermission(address counter) public onlyOwner {
        counterRights[counter] = 0;
        emit CounterRightChanged(counter, 0);
    }

}
