import hre, { ethers } from "hardhat";
import { KAP20__factory, MinableToken__factory } from "../../typechain";
import addressUtils from "../../utils/addressUtils";

const changeFaucetRate = async (tokenName: string) => {
    const [, owner] = await ethers.getSigners();
    const addressList = await addressUtils.getAddressList(hre.network.name);
    const token = await MinableToken__factory.connect(addressList[tokenName], owner);

    const faucetRate = await token.faucetRate();

    await token.setFaucetRate(faucetRate).then(tx => tx.wait());

    console.log(tokenName, await token.faucetRate());
}

async function main() {
    // await changeFaucetRate('KBTC');
    await changeFaucetRate('KETH');
    // await changeFaucetRate('KUSDT');
    // await changeFaucetRate('KUSDC');
    // await changeFaucetRate('KDAI');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
