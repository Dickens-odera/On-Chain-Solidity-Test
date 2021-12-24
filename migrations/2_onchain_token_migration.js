const OnChainERC20Token = artifacts.require("OnChainERC20Token");

module.exports = function(deployer){
    deployer.deploy(OnChainERC20Token, 50000000000);
}