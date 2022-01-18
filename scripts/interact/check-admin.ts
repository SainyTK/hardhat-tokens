import hre, { ethers } from "hardhat";
import { KAP20__factory } from "../../typechain";
import addressUtils from "../../utils/addressUtils";

const checkAdmin = async (tokenName: string) => {
    const [owner] = await ethers.getSigners();

    const addressList = await addressUtils.getAddressList(hre.network.name);
    const token = await KAP20__factory.connect(addressList[tokenName], owner);

    console.log(tokenName, await token.adminRouter());
}

async function main() {
    await checkAdmin('KBTC');
    await checkAdmin('KETH');
    await checkAdmin('KUSDT');
    await checkAdmin('KUSDC');
    await checkAdmin('KDAI');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
