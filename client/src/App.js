import React, {Component} from 'react';
import OnChainTokenABI from "../src/abi/OnChainERC20Token.json";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      contractABI:null,
      provider:null,
      account:null,
      bob:null
    }

    this.loadWeb3 = this.loadWeb3.bind(this);
    this.loadBlockchain = this.loadBlockchain.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentWillMount(){
    await loadWeb3();
    await loadBlockchain();

    setTimeout(() => {
      this.state.contractABI.on("Transfer", (from, to, amount) => {
        alert("Transfer Event triggered...");
        console.log(from);
        console.log(to);
        console.log(amount);
      });
    })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      this.setState({ provider: window.web3 });
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      this.setState({ provider: window.web3 });
    } else {
      window.alert("Non-Ethereum browser detected, please consider installing MetaMask Extension for your browser");
    }
  }

  async loadBlockchain(){
    const netWorkID = await web3.eth.net.getId();
    const tokenContractData = OnChainTokenABI.networks[netWorkID];
    const tokenContract = await new web3.eth.Contract(OnChainTokenABI.abi, tokenContractData.address);
    this.setState({ contractABI: tokenContract});

    const accounts = await web3.eth.getAccounts();
    this.setState({ account : accounts[0]});
    this.setState({ bob: accounts[1] });

  }

  async onSubmit(event){
    event.preventDefault();
    const tokenAmount = await event.target.token_amount.value;
    const tx = await this.state.contractABI.methods.transfer(this.state.bob, tokenAmount)
    .send({from: account})
    .then(( result ) => {
        window.alert("Token transfer success");
        console.log(result);
    })
    .catch(( error ) => { console.error(error)});
  }

  
  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header"><div className="card-title">OnChain ERC20 token</div></div>
              <div className="card-body">
                <form className="form-horizontal" onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input type="number" name="token_amount" className="form-control" placeholder="Enter Token Amount"></input>
                    </div>
                    <div className="form-group">
                    <button type="submit" className="btn btn-sm btn-success">Transfer</button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
