import { formatEther, parseEther } from "@ethersproject/units";
import { ethers } from "hardhat";
import timeUtils from "../../utils/timeUtils";

async function main() {
  const [owner] = await ethers.getSigners();

  const TimeCounter = await ethers.getContractFactory("TimeCounter");
  const counter = await TimeCounter.deploy();
  console.log("Counter deployed to:", counter.address);

  const MinableToken = await ethers.getContractFactory("MinableToken");

  const maxElapse = 10;

  const kusdtFaucetRate = parseEther('1');
  const kusdt = await MinableToken.deploy("Bitkub-Peg USDT", "KUSDT", kusdtFaucetRate, maxElapse, counter.address);
  console.log("KUSDT deployed to: ", kusdt.address)
  await counter._grantPermission(kusdt.address);
  console.log("KUSDT permission: ", await counter.counterRights(kusdt.address).then(res => res.toString()));

  const kbtcFaucetRate = parseEther('0.0001');
  const kbtc = await MinableToken.deploy("Bitkub-Peg BTC", "KBTC", kbtcFaucetRate, maxElapse, counter.address);
  console.log("KBTC deployed to: ", kbtc.address)
  await counter._grantPermission(kbtc.address);
  console.log("KBTC permission: ", await counter.counterRights(kbtc.address).then(res => res.toString()));

  let round = 10;

  for (let i = 0; i < round; i++) {
    await timeUtils.advanceBlock();
    console.log("Elapse time: ", await counter.getElapsedTimeOf(owner.address).then(res => res.toString()));
  }

  console.log("Minable KUSDT: ", await kusdt.getMiningReward().then(res =>  formatEther(res)));
  console.log("Minable KBTC: ", await kbtc.getMiningReward().then(res =>  formatEther(res)));

  await kbtc.mine();
  await kusdt.mine();

  console.log("KUSDT balance: ", await kusdt.balanceOf(owner.address).then(res => formatEther(res)))
  console.log("KBTC balance: ", await kbtc.balanceOf(owner.address).then(res => formatEther(res)))

  round = 5;

  for (let i = 0; i < round; i++) {
    await timeUtils.advanceBlock();
    console.log("Elapse time: ", await counter.getElapsedTimeOf(owner.address).then(res => res.toString()));
  }

  console.log("Minable KUSDT: ", await kusdt.getMiningReward().then(res =>  formatEther(res)));
  console.log("Minable KBTC: ", await kbtc.getMiningReward().then(res =>  formatEther(res)));

  await kbtc.mine();

  for (let i = 0; i < round; i++) {
    await timeUtils.advanceBlock();
    console.log("Elapse time: ", await counter.getElapsedTimeOf(owner.address).then(res => res.toString()));
  }
  
  await kusdt.mine();

  console.log("KUSDT balance: ", await kusdt.balanceOf(owner.address).then(res => formatEther(res)))
  console.log("KBTC balance: ", await kbtc.balanceOf(owner.address).then(res => formatEther(res)))

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
