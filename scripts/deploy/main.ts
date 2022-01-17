import addressUtils from "../../utils/addressUtils";
import { deployKKUB } from "./kkub";
import hre from "hardhat";
import { deployMinableToken } from "./minable-token";
import { parseEther } from "ethers/lib/utils";
import timeUtils from "../../utils/timeUtils";
import { deployTimeCounter } from "./time-counter";

async function main() {
  const addressList = await addressUtils.getAddressList(hre.network.name);
  const committee = addressList["Committee"];
  const kyc = addressList["KYC"];
  const adminRouter = addressList["AdminProjectRouter"];

  const acceptedKycLevel = 4;

  // await deployTimeCounter();

  // await deployKKUB(committee, adminRouter, kyc, acceptedKycLevel);

  await deployMinableToken(
    "Bitkub-Peg BTC",
    "KBTC",
    18,
    committee,
    adminRouter,
    kyc,
    acceptedKycLevel,
    parseEther("0.000020269"),
    timeUtils.duration.hours(2)
  );

  await deployMinableToken(
    "Bitkub-Peg ETH",
    "KETH",
    18,
    committee,
    adminRouter,
    kyc,
    acceptedKycLevel,
    parseEther("0.0002368"),
    timeUtils.duration.hours(2)
  );

  await deployMinableToken(
    "Bitkub-Peg USDT",
    "KUSDT",
    18,
    committee,
    adminRouter,
    kyc,
    acceptedKycLevel,
    parseEther("1"),
    timeUtils.duration.hours(2)
  );

  await deployMinableToken(
    "Bitkub-Peg USDC",
    "KUSDC",
    18,
    committee,
    adminRouter,
    kyc,
    acceptedKycLevel,
    parseEther("1"),
    timeUtils.duration.hours(2)
  );

  await deployMinableToken(
    "Bitkub-Peg DAI",
    "KDAI",
    18,
    committee,
    adminRouter,
    kyc,
    acceptedKycLevel,
    parseEther("1"),
    timeUtils.duration.hours(2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
