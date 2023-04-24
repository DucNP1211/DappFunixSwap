const ReserveSWA = artifacts.require("Reserve");
const ReserveME = artifacts.require("Reserve");
const Exchange = artifacts.require("Exchange");

module.exports = async function(deployer, network, accounts, web3) {
    await deployer.deploy(ReserveSWA, "Jellyfishnya", "SWA", 2, { from: accounts[0], gas: 3000000 });
    const instanceSWA = await ReserveSWA.deployed();
    const tokenSwaAddress = await instanceSWA.getTokenAddress();
    console.log(`.=.=.=.=.==.=.=.=.=.=.=. Token SWA address: ${tokenSwaAddress}`);

    await deployer.deploy(ReserveME, "Meee", "ME", 1, { from: accounts[0], gas: 3000000 });
    const instanceME = await ReserveME.deployed();
    const tokenMeAddress = await instanceME.getTokenAddress();
    console.log(`.=.=.=.=.==.=.=.=.=.=.=. Token ME address: ${tokenMeAddress}`);

    await deployer.deploy(Exchange, { from: accounts[0], gas: 6000000 });
    // const instanceEx = await Exchange.deployed();
    // const ownerEx = await instanceEx.owner();
    // console.log(`.=.=.=.=.==.=.=.=.=.=.=. Exchange owner: ${ownerEx}`);
};