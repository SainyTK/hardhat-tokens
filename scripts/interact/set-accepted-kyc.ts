import hre, { ethers } from "hardhat";
import { KAP20__factory } from "../../typechain";
import addressUtils from "../../utils/addressUtils";

const changeAcceptecKYC = async (tokenName: string) => {
    const [owner] = await ethers.getSigners();
    const addressList = await addressUtils.getAddressList(hre.network.name);
    const token = await KAP20__factory.connect(addressList[tokenName], owner);

    console.log(tokenName, "Committee: ", await token.committee());

    await token.setAcceptedKycLevel(0).then(tx => tx.wait());

    console.log(tokenName, await token.acceptedKycLevel());
}

async function main() {
    // await changeAcceptecKYC('KBTC');
    await changeAcceptecKYC('KETH');
    await changeAcceptecKYC('KUSDT');
    await changeAcceptecKYC('KUSDC');
    await changeAcceptecKYC('KDAI');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
