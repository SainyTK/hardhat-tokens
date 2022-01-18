import hre, { ethers } from "hardhat";
import addressUtils from "../../utils/addressUtils";
import {
  IAdminProjectRouter,
  IAdminProjectRouter__factory,
  MintableToken__factory,
} from "../../typechain";
import { formatUnits, parseEther } from "@ethersproject/units";
import { BigNumberish } from "@ethersproject/bignumber";

const mint = async (
  contractName: string,
  account: string,
  amount: BigNumberish
) => {
  const [, , owner] = await ethers.getSigners();

  const addressList = await addressUtils.getAddressList(hre.network.name);
  const token = await MintableToken__factory.connect(
    addressList[contractName],
    owner
  );

  const decimals = await token.decimals();

  console.log(`Before mint: `, await token.balanceOf(account).then(res => formatUnits(res, decimals)), contractName);
  await token.connect(owner).mint(account, amount).then(tx => tx.wait());
  console.log(`After mint: `, await token.balanceOf(account).then(res => formatUnits(res, decimals)), contractName);
};

async function main() {
  const address = "0x31c2544178f8E8F7F4317247e1dE14591945f1CB";
  // await mint('KBTC', address, parseEther('20'));
  // await mint('KETH', address, parseEther('300'));
  // await mint('KUSDT', address, parseEther('700000'));
  // await mint('KUSDC', address, parseEther('700000'));
  await mint("KDAI", address, parseEther("700000"));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
