const StringStorageConract = artifacts.require('StringStorage');

module.exports = function(deployer){
    deployer.deploy(StringStorageConract);
}