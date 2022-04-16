import hre, { ethers } from "hardhat";
import addressUtils from "../../utils/addressUtils";
import { MintableToken__factory } from "../../typechain";
import { formatUnits, parseEther } from "@ethersproject/units";
import { BigNumberish } from "@ethersproject/bignumber";

const mint = async (
  contractName: string,
  account: string,
  amount: BigNumberish
) => {
  const [owner] = await ethers.getSigners();

  const addressList = await addressUtils.getAddressList(hre.network.name);
  const token = await MintableToken__factory.connect(
    addressList[contractName],
    owner
  );

  const decimals = await token.decimals();

  console.log(
    `Before mint: `,
    await token.balanceOf(account).then((res) => formatUnits(res, decimals)),
    contractName
  );
  await token.mint(account, amount).then((tx) => tx.wait());
  console.log(
    `After mint: `,
    await token.balanceOf(account).then((res) => formatUnits(res, decimals)),
    contractName
  );
};

async function main() {
  const address = "0x232Cc14bF0c27fc01BDdd84AC2D1A00d31349261";
  await mint("WIS", address, parseEther("100000"));
  // await mint('KBTC', address, parseEther('4'));
  // await mint('KETH', address, parseEther('50'));
  //   await mint("KUSDT", address, parseEther("10"));
  // await mint('KUSDC', address, parseEther('200000'));
  // await mint('KDAI', address, parseEther('200000'));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
