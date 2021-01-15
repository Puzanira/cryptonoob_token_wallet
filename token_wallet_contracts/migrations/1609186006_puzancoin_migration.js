let PuzaNCoin = artifacts.require("PuzaNCoin");

module.exports = function(_deployer) {
  _deployer.deploy(PuzaNCoin);
};
