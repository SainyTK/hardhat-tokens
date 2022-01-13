import { BigNumberish } from "ethers";
import hre, { ethers } from "hardhat";
import addressUtils from "../../utils/addressUtils";

export async function deployKKUB(
  committee_: string,
  adminRouter_: string,
  kyc_: string,
  acceptedKycLevel_: BigNumberish
) {
  const KKUB = await ethers.getContractFactory("KKUB");
  const kkub = await KKUB.deploy(
    committee_,
    adminRouter_,
    kyc_,
    acceptedKycLevel_
  );
  console.log(`KKUB deployed to:`, kkub.address);

  await addressUtils.saveAddresses(hre.network.name, { KKUB: kkub.address });
}
