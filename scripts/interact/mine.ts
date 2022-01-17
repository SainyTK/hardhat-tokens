import hre, { ethers } from "hardhat";
import addressUtils from "../../utils/addressUtils";
import { MinableToken__factory } from "../../typechain";
import { formatUnits } from "@ethersproject/units";

const mine = async (contractName: string, account: string) => {
    const [owner] = await ethers.getSigners();

    const addressList = await addressUtils.getAddressList(hre.network.name);
    const token = MinableToken__factory.connect(addressList[contractName], owner);

    const decimals = await token.decimals();

    console.log(`Before mine: `, await token.balanceOf(account).then(res => formatUnits(res, decimals)), contractName);
    await token.mine().then(tx => tx.wait());
    console.log(`After mine: `, await token.balanceOf(account).then(res => formatUnits(res, decimals)), contractName);
}

async function main() {
    const address = '0xcdCc562088F99f221B0C3BB1EDcFD5A9646D0B25';
    await mine('KBTC', address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
