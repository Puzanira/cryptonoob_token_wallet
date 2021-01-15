import React, { Component } from 'react';
import Web3 from 'web3';

import Tokens20 from './tokens/all20';
import Tokens721 from './tokens/all721';

import Nav from './components/shards/Nav';
import Description from './components/shards/Description';
import InstallMetamask from './components/shards/InstallMetamask';

import Container from './components/Container';

import './App.css';

const initialState = {
  inProgress: false,
  tx20: null,
  tx721: null,
  network: 'Checking...',
  account: null,
  tokens20: [],
  tokens721: [],
  transferDetail20: null,
  transferDetail721: null,
  mintDetail20: null,
  mintDetail721: null,
  approveDetail20: null,
  approveDetail721: null,
  fields: {
    receiver: null,
    amount: null,
    metadata: null,
    tokenid: null,
    gasPrice: null,
    gasLimit: null
  },
  defaultGasPrice: null,
  defaultGasLimit: 200000
};

class App extends Component {

  constructor(props) {
    super(props);

    this.tokens20 = Tokens20;
    this.tokens721 = Tokens721;
    this.appName = 'TokenWallet';
    this.isWeb3 = true;

    this.newTransfer20 = this.newTransfer20.bind(this);
    this.newTransfer721 = this.newTransfer721.bind(this);
    this.newMint20 = this.newMint20.bind(this);
    this.newMint721 = this.newMint721.bind(this);
    this.newApprove20 = this.newApprove20.bind(this);
    this.newApprove721 = this.newApprove721.bind(this);
    this.closeTransfer = this.closeTransfer.bind(this);
    this.onInputChangeUpdateField = this.onInputChangeUpdateField.bind(this);
  
    this.state = initialState;
  };


  setNetwork = () => {
    let networkName;

    this.web3.eth.getChainId((err, version) => {
      switch(version) {
        case "1":
          networkName = "Main";
          break;
        case "2":
          networkName = "Morden";
          break;
        case "3":
          networkName = "Ropsten";
          break;
        case "4":
          networkName = "Rinkeby";
          break;
        case "42":
          networkName = "Kovan";
          break;
        default:
          networkName = version;
      }

      this.setState({ network: networkName });
    })
  }

  setGasPrice = () => {
    this.web3.eth.getGasPrice((err, gasPrice) => {
      let price = this.web3.utils.fromWei(gasPrice, 'gwei');
      if (!err) 
        this.setState({ defaultGasPrice: price });
    })
  };

  componentDidMount() {
    if (window.ethereum) {
      let account;

      const ethereum  = window.ethereum;
      window.web3 = new Web3(ethereum);
      this.web3 = new Web3(ethereum);

      ethereum.enable().then(accounts => {
        account = accounts[0];
        this.web3.eth.defaultAccount = account;

        this.setState({ account });

        Tokens20.forEach(token => {
          let erc20Token = new this.web3.eth.Contract(token.abi, token.address);
          erc20Token.methods.balanceOf(account).call().then(response => {
            const { decimal, symbol, name, icon, abi, address } = token;
            let precision = '1e' + decimal;
            let balance = response / precision;

            balance = balance >= 0 ? balance : 0;

            let tokens20 = this.state.tokens20;

            if (balance > 0) tokens20.push({
              decimal,
              balance,
              name,
              symbol,
              icon,
              abi,
              address
            });

            this.setState({ tokens20 });
          })
          .catch(err => {
            console.log(err);
          });
        });
  
        Tokens721.forEach(token => {
          let erc721Token = new this.web3.eth.Contract(token.abi, token.address);
  
          erc721Token.methods.MDTrack(account).call().then(response => {
            const { name, symbol, icon, abi, address } = token;

            let tokenid = parseInt(response);

            tokenid = tokenid >= 0 ? tokenid : 0;

            if (tokenid !== 0) {
              erc721Token.methods.tokenURI(tokenid).call().then((response) => {
                if (response) {
                  let metadata = response;
                  let tokens721 = this.state.tokens721;

                  tokens721.push({
                    name, 
                    symbol,
                    tokenid,
                    icon,
                    abi,
                    address,
                    metadata
                  });

                  this.setState({ tokens721 });
                }
              })
            }
          })
          .catch(err => {
            console.log(err);
          });
        });  
      });

      this.setNetwork();
      this.setGasPrice();

    } else {
      this.isWeb3 = false;
    }
  }

  newTransfer20 = index => {
    this.setState({ transferDetail20: this.state.tokens20[index] });
  };

  newTransfer721 = index => {
    this.setState({ transferDetail721: this.state.tokens721[index] });
  };
  
  newMint20 = index => {
    this.setState({ mintDetail20: this.state.tokens20[index] });
  };

  newMint721 = index => {
    this.setState({ mintDetail721: this.state.tokens721[index] });
  };

  newApprove20 = index => {
    this.setState({ approveDetail20: this.state.tokens20[index] });
  };

  newApprove721 = index => {
    this.setState({ approveDetail721: this.state.tokens20[index] });
  };

  closeTransfer = () => {
    this.setState({
      transferDetail20: null,
      transferDetail721: null,
      mintDetail20: null,
      mintDetail721: null,
      approveDetail20: null,
      approveDetail721: null,
      fields: null
    });
  };

  resetApp = () => {
    this.setState(initialState);
    window.location.reload();
  };

  Transfer = () => {
    this.setState({ inProgress: true });

    let contract;
    if (this.state.fields.metadata) {
      contract = new this.web3.eth.Contract(
        this.state.transferDetail721.abi, 
        this.state.transferDetail721.address
      );
    } else {
      contract = new this.web3.eth.Contract(
        this.state.transferDetail20.abi,
        this.state.transferDetail20.address
      );
    }

    let metadata;
    let tokenid;
    let amount;
    if (this.state.fields.metadata) {
      metadata = this.state.fields.metadata;
      tokenid = this.state.fields.tokenid;
    } else {
      amount = this.state.fields.amount * Math.pow(10, this.state.transferDetail20.decimal);
    }

    let receiver = this.state.fields.receiver.toString();
    let account = this.state.account;

    if (metadata) {
      contract.methods.transferNFT_(account, receiver, tokenid, metadata).send({
        from: this.web3.eth.defaultAccount
      }).then((response, err) => {
        if (response) {
          console.log(response);
          this.resetApp();
          this.setState({
            tx20: response.tx20,
            tx721: response.tx721,
            inProgress: false
          });
        } else {
          console.log(err);
        }
      })
    } else {
      contract.methods.transfer(receiver, amount).send({
        from: this.web3.eth.defaultAccount
      }).then((response, err) => {
        if (response) {
          console.log(response);
          this.resetApp();
          this.setState({
            tx20: response.tx20,
            tx721: response.tx721,
            inProgress: false
          });
        } else {
          console.log(err);
        }
      });
    }
  }

  Mint = () => {
    this.setState({ inProgress: true });

    let contract;
    if (this.state.fields.metadata) {
      contract = new this.web3.eth.Contract(
        this.state.mintDetail721.abi, 
        this.state.mintDetail721.address
      );
    } else {
      contract = new this.web3.eth.Contract(
        this.state.mintDetail20.abi,
        this.state.mintDetail20.address
      );
    }

    let metadata;
    let amount;
    if (this.state.fields.metadata) {
      metadata = this.state.fields.metadata;
    } else {
      amount = this.state.fields.amount * Math.pow(10, this.state.mintDetail20.decimal);
    }

    let receiver = this.state.fields.receiver.toString();

    if (metadata) {
      contract.methods.createNFT_(receiver, metadata).send({
        from: this.web3.eth.defaultAccount
      }).then((response, err) => {
        if (response) {
          console.log(response);
          this.resetApp();
          this.setState({
            tx20: response.tx20,
            tx721: response.tx721,
            inProgress: false
          });
        } else {
          console.log(err);
        }
      })
    } else {
      contract.methods.mint(receiver, amount).send({
        from: this.web3.eth.defaultAccount
      }).then((response, err) => {
        if (response) {
          console.log(response);
          this.resetApp();
          this.setState({
            tx20: response.tx20,
            tx721: response.tx721,
            inProgress: false
          });
        } else {
          console.log(err);
        }
      });
    }
  }

  Approve = () => {
    this.setState({ inProgress: true });

    let contract;
    if (this.state.approveDetail721 && this.state.approveDetail721.abi) {
      contract = new this.web3.eth.Contract(
        this.state.approveDetail721.abi, 
        this.state.approveDetail721.address
      );
    } else {
      contract = new this.web3.eth.Contract(
        this.state.approveDetail20.abi,
        this.state.approveDetail20.address
      );
    }

    let receiver = this.state.fields.receiver.toString();

    if (this.state.approveDetail20 && this.state.approveDetail20.abi) {
      let amount = this.state.fields.amount * Math.pow(10, this.state.approveDetail20.decimal);
      contract.methods.approve(receiver, amount).send({
        from: this.web3.eth.defaultAccount
      }).then((response, err) => {
        if (response) {
          console.log(response);
          this.resetApp();
          this.setState({
            tx20: response.tx20,
            tx721: response.tx721,
            inProgress: false
          });
        } else {
          console.log(err);
        }
      })
    } else {
      let tokenid = this.state.fields.tokenid;
      contract.methods.approve(receiver, tokenid).send({
        from: this.web3.eth.defaultAccount
      }).then((response, err) => {
        if (response) {
          console.log(response);
          this.resetApp();
          this.setState({
            tx20: response.tx20,
            tx721: response.tx721,
            inProgress: false
          });
        } else {
          console.log(err);
        }
      });
    }
  }

  onInputChangeUpdateField = (name, value) => {
    let fields = this.state.fields;
    fields[name] = value;
    this.setState({ fields });
  }

  render() {
    const {
      transferDetail20,
      transferDetail721,
      mintDetail20,
      mintDetail721,
      approveDetail20,
      approveDetail721,
      account,
      defaultGasLimit,
      defaultGasPrice,
      tx20,
      tx721,
      tokens20,
      tokens721
    } = this.state;


    if (this.isWeb3) {
      return (
        <div>
          <Nav appName={this.appName} network={this.state.network} />
          <Description />
          <Container
            onInputChangeUpdateField={this.onInputChangeUpdateField}
            transferDetail20={transferDetail20}
            transferDetail721={transferDetail721}
            mintDetail20={mintDetail20}
            mintDetail721={mintDetail721}
            approveDetail20={approveDetail20}
            approveDetail721={approveDetail721}
            closeTransfer={this.closeTransfer}
            newTransfer20={this.newTransfer20}
            newTransfer721={this.newTransfer721}
            newApprove20={this.newApprove20}
            newApprove721={this.newApprove721}
            newMint20={this.newMint20}
            newMint721={this.newMint721}
            Transfer={this.Transfer}
            Mint={this.Mint}
            Approve={this.Approve}
            account={account}
            defaultGasLimit={defaultGasLimit}
            defaultGasPrice={defaultGasPrice}
            tx20={tx20}
            tx721={tx721}
            tokens20={tokens20}
            tokens721={tokens721}
          />  
        </div>
      );
    } else {
      return (
        <InstallMetamask />
      );
    }
  }
}

export default App;
