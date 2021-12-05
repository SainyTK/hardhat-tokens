import hre, { ethers } from "hardhat";
import addressUtils from "../../utils/addressUtils";

export async function deployTimeCounter() {
    const TimeCounter = await ethers.getContractFactory("TimeCounter");
    const counter = await TimeCounter.deploy();
    console.log("Counter deployed to:", counter.address);

    await addressUtils.saveAddresses(hre.network.name, { "TimeCounter": counter.address });
    return counter;
}