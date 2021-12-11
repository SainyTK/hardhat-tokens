import { ethers } from "hardhat";
import { ERC20__factory } from "../../typechain";
import { formatEther, parseEther } from "@ethersproject/units";
import { Wallet } from "@ethersproject/wallet";

async function main() {
  const [owner, psuOwner] = await ethers.getSigners();

  const contractAddr = "0x0d01bc6041ac8f72e1e4b831714282f755012764";

  const psucoin = ERC20__factory.connect(contractAddr, psuOwner);

  const round = 100;

  const txCount =
    (await psuOwner.provider?.getTransactionCount(psuOwner.address)) || 0;

  const promises = Array.from(new Array(round)).map(async (_, i) => {
    const nonce = txCount + i;
    const dest = Wallet.createRandom().address;
    const amount = Math.floor(Math.random() * 3 + 1).toString();
    await psucoin
      .transfer(dest, parseEther(amount), { nonce })
      .then((tx) => tx.wait());
    console.log(
      `${dest} has: `,
      await psucoin.balanceOf(dest).then((res) => formatEther(res)),
      "PSUCOIN"
    );
  });

  await Promise.all(promises);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
