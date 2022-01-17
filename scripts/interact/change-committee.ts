import hre, { ethers } from "hardhat";
import { KAP20__factory } from "../../typechain";
import addressUtils from "../../utils/addressUtils";

const changeCommittee = async (tokenName: string) => {
    const [, owner] = await ethers.getSigners();
    console.log({owner: owner.address});
    const addressList = await addressUtils.getAddressList(hre.network.name);
    const token = await KAP20__factory.connect(addressList[tokenName], owner);

    const committee = '0x73D8F731eC0d3945d807a904Bf93954B82b0d594';
    await token.setCommittee(committee).then(tx => tx.wait());

    console.log(await token.committee());
}

async function main() {
    // await changeCommittee('KBTC');
    await changeCommittee('KETH');
    // await changeCommittee('KUSDT');
    // await changeCommittee('KUSDC');
    // await changeCommittee('KDAI');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
