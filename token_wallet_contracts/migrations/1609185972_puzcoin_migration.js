let PuzCoin = artifacts.require("PuzCoin");
module.exports = function(_deployer) {
  _deployer.deploy(PuzCoin);
};
