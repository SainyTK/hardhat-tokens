import hre, { ethers } from "hardhat";
import { KAP20__factory } from "../../typechain";
import addressUtils from "../../utils/addressUtils";

const changeAdmin = async (tokenName: string) => {
    const [owner] = await ethers.getSigners();
    const addressList = await addressUtils.getAddressList(hre.network.name);
    const token = await KAP20__factory.connect(addressList[tokenName], owner);

    await token.setAdmin(addressList['AdminProjectRouter']);
}

async function main() {
    await changeAdmin('KBTC');
    await changeAdmin('KETH');
    await changeAdmin('KUSDT');
    await changeAdmin('KUSDC');
    await changeAdmin('KDAI');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
