// import { parseEther } from "@ethersproject/units";
// import timeUtils from "../../utils/timeUtils";
// import { deployMinableToken } from "./minable-token";
// import { deployTimeCounter } from "./time-counter";
import { deployWKUB } from "./wkub";

async function main() {
  // await deployTimeCounter();

  await deployWKUB();

  // await deployMinableToken(
  //     "Bitkub-Peg BTC",
  //     "KBTC",
  //     parseEther('0.000020269'),
  //     timeUtils.duration.hours(2)
  // )

  // await deployMinableToken(
  //     "Bitkub-Peg ETH",
  //     "KETH",
  //     parseEther('0.0002368'),
  //     timeUtils.duration.hours(2)
  // )

  // await deployMinableToken(
  //     "Bitkub-Peg USDT",
  //     "KUSDT",
  //     parseEther('1'),
  //     timeUtils.duration.hours(2)
  // )

  // await deployMinableToken(
  //     "Bitkub-Peg USDC",
  //     "KUSDC",
  //     parseEther('1'),
  //     timeUtils.duration.hours(2)
  // )

  // await deployMinableToken(
  //     "Bitkub-Peg DAI",
  //     "KDAI",
  //     parseEther('1'),
  //     timeUtils.duration.hours(2)
  // )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
