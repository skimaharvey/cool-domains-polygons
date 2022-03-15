
const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    // We pass in "ninja" to the constructor when deploying
    const domainContract = await domainContractFactory.deploy("french");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);

    
    let txn = await domainContract.register("maxime",  {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
    console.log("Minted domain maxime.french");

    txn = await domainContract.setRecord("maxime", "Am I a french or not??");
    await txn.wait();
    console.log("Set record for max.french");

    const address = await domainContract.getAddress("max");
    console.log("Owner of domain max:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  
}


const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
runMain();
  