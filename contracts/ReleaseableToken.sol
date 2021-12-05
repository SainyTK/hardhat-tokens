//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MintableToken.sol";

contract ReleaseableToken is MintableToken {

    constructor(
        string memory name_,
        string memory symbol_
    ) MintableToken(name_, symbol_) {}

    function release(address account, uint256 amount) public onlyOwner {
        transfer(account, amount);
    }

}
