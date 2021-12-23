const StringStorageConract = artifacts.require('StringStorage');

contract('StringStorage', async(accounts) => {
    describe("Strign Storage", async() => {
      let instance;
      beforeEach(async() => {
        instance = StringStorage.deployed();
        [owner,alice, bob] = accounts;
      });

      it("can successfully deploy contract", async() => {
          assert(instance,"Contract deployes successfully");
      });

      it("can store a string value", async() => {
        let newString = "Hello there";
        const result = await instance.addNewString(newString, { from: owner});
        const totalStrings =  await instance.totalStrings();
        assert(result.receipt.status, true);
        assert(result.logs[0].args.user, owner);
        assert(result.logs[0].args.stringValue, newString);
        assert.equal(totalStrings, 1);
      });

      it("can only allow an owner to add a string", async() => {
        let stringValue = "Hello there";
        const result = await instance.addNewString(stringValue, { from: alice });
        assert(false);
      });
    })
});