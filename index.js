const Web3 = require("web3");
const OnChainToken = require("./build/contracts/OnChainERC20Token.json");

const init = async () => {
    const web3 = new Web3("http://localhost:7545");
    const id = await web3.eth.net.getId();
    const deployedNetwork = OnChainToken.networks[id];
    const eventExample = new web3.eth.Contract(
        OnChainToken.abi,
        "0x1e4D51A5a735A75f2af35143205b9ff036f57b5A"
    );

    const accounts = await web3.eth.getAccounts();
    const receipt = await eventExample.methods.transfer(accounts[1], 10)
        .send({ from: account[0]})
        .then(( response) => {
            console.log(response);
        })
        .catch((error) => { console.error(error)});
    console.log(receipt.events.Transfer.raw);

    //listen to Transfer events
    eventExample.on("Transfer",( from, to, amount) => {
        console.log('Listening to the Transfer event ....');
        console.log(from);
        console.log(to);
        console(amount);
    });

};

init();