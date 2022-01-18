import hre, { ethers } from "hardhat";
import addressUtils from "../../utils/addressUtils";
import { TimeCounter__factory } from "../../typechain";

const grantPermission = async (contractName: string) => {
  const [owner] = await ethers.getSigners();

  const addressList = await addressUtils.getAddressList(hre.network.name);
  const counter = await TimeCounter__factory.connect(
    addressList.TimeCounter,
    owner
  );

  console.log({owner: owner.address});
  console.log("Owner: ", await counter.owner());

  await counter
    ._grantPermission(addressList[contractName])
    .then((tx) => tx.wait());
  console.log(
    `${contractName} permission: `,
    await counter.counterRights(addressList[contractName])
  );
};

async function main() {
  await grantPermission("KBTC");
  await grantPermission("KETH");
  await grantPermission("KUSDT");
  await grantPermission("KUSDC");
  await grantPermission("KDAI");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
