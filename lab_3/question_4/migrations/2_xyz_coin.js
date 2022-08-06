// a migration script that deploys XYZCoin contract to the blockchain
const XYZCoin = artifacts.require("XYZCoin");

module.exports = function (deployer) {
  deployer.deploy(XYZCoin);
  
};

