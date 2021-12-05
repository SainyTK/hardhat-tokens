//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MintableToken.sol";
import "./time/TimeCounter.sol";

contract MinableToken is MintableToken {

    uint public faucetRate;
    uint public maxElapsed;

    TimeCounter public counter;

    constructor(
        string memory name_,
        string memory symbol_,
        uint faucetRate_,
        uint maxElapsed_,
        address counter_
    ) MintableToken(name_, symbol_) {
        require(faucetRate_ > 0, "MinableToken: faucet rate must be greater than 0");
        require(maxElapsed_ > 0, "MinableToken: maxElapsed rate must be greater than 0");

        faucetRate = faucetRate_;
        maxElapsed = maxElapsed_;
        counter = TimeCounter(counter_);
    }

    function getMiningReward() public view returns (uint) {
        uint actualElapsed = counter.getElapsedTimeOf(msg.sender);
        uint elapsed = actualElapsed > maxElapsed ? maxElapsed : actualElapsed;
        return faucetRate * elapsed / maxElapsed;
    }

    function mine() public {
        _mint(msg.sender, getMiningReward());
        counter.stampLastAction(msg.sender);
    }

}
