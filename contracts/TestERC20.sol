pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestERC20 is ERC20 {
    constructor(
        string memory name,
        string memory symbol
    ) public ERC20(name, symbol) {}

    function mint(address user, uint amount) public {
        _mint(user, amount);
    }

    function burn(address user, uint amount) public {
        _burn(user, amount);
    }
}
