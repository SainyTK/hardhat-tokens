import { BigNumberish, Overrides } from "ethers";
import hre, { ethers } from "hardhat";
import addressUtils from "../../utils/addressUtils";

export async function deployMinableToken(
  name_: string,
  symbol_: string,
  faucetRate_: BigNumberish,
  maxElapsed_: BigNumberish,
  overrides?: Overrides & { from?: string | Promise<string> }
) {
  const addressList = await addressUtils.getAddressList(hre.network.name);
  const MinableToken = await ethers.getContractFactory("MinableToken");
  const minableToken = overrides
    ? await MinableToken.deploy(
        name_,
        symbol_,
        faucetRate_,
        maxElapsed_,
        addressList.TimeCounter,
        overrides
      )
    : await MinableToken.deploy(
        name_,
        symbol_,
        faucetRate_,
        maxElapsed_,
        addressList.TimeCounter
      );

  console.log(`${symbol_} deployed to:`, minableToken.address);

  await addressUtils.saveAddresses(hre.network.name, {
    [symbol_]: minableToken.address,
  });
}
