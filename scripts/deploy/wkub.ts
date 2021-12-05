import hre, { ethers } from "hardhat";
import addressUtils from "../../utils/addressUtils";

export async function deployWKUB() {
    const WKUB = await ethers.getContractFactory("WKUB");
    const wkub = await WKUB.deploy();
    console.log(`WKUB deployed to:`, wkub.address);

    await addressUtils.saveAddresses(hre.network.name, { WKUB: wkub.address });
}