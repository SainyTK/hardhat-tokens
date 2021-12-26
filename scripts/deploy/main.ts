import addressUtils from "../../utils/addressUtils";
import { deployWKUB } from "./wkub";
import hre from "hardhat";
import { deployMinableToken } from "./minable-token";
import { parseEther } from "ethers/lib/utils";
import timeUtils from "../../utils/timeUtils";

async function main() {
  const addressList = await addressUtils.getAddressList(hre.network.name);
  const committee = addressList["Committee"];
  const kyc = addressList["KYC"];
  const adminRouter = addressList["AdminProjectRouter"];

  // await deployTimeCounter();

  // await deployWKUB();

  await deployMinableToken(
    "Bitkub-Peg BTC",
    "KBTC",
    18,
    committee,
    adminRouter,
    kyc,
    4,
    parseEther("0.000020269"),
    timeUtils.duration.hours(2)
  );

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
