import hre, { ethers } from "hardhat";
import addressUtils from "../../utils/addressUtils";

export async function deployTestERC20(name_: string, symbol_: string) {
  const TestERC20 = await ethers.getContractFactory("TestERC20");
  const token = await TestERC20.deploy(name_, symbol_);

  console.log(`${symbol_} deployed to:`, token.address);

  await addressUtils.saveAddresses(hre.network.name, {
    [symbol_]: token.address,
  });
}
