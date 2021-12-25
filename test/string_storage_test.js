const StringStorageConract = artifacts.require('StringStorage');
const OnChainTokenContract = artifacts.require('OnChainERC20Token');

contract('StringStorageConract', async(accounts) => {
    describe("String Storage", async() => {
      let instance;
      let tokenInstance;
      let tokenAddress ;
      beforeEach(async() => {
        instance = await StringStorageConract.deployed();
        tokenInstance = await OnChainTokenContract.deployed();
        tokenAddress = await tokenInstance.address;
        [owner,alice, bob] = accounts;
      });

      it("can successfully deploy contract", async() => {
          assert(instance,"Contract deployes successfully");
      });
  
      it("can store a string value", async() => {
        let newString = "Hello there";
        const result = await instance.addNewString(newString, tokenAddress, { from: owner});
        const totalStrings =  await instance.totalStrings();
        assert(result.receipt.status, true);
        assert(result.logs[0].args.user, owner);
        assert(result.logs[0].args.stringValue, newString);
        assert.equal(totalStrings, 1);
      });

      it("can only allow an owner to add a string", async() => {
        let stringValue = "Hello there";
        const result = await instance.addNewString(stringValue, tokenAddress, { from: alice });
        assert(false);
      });
    })
});