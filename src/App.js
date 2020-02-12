import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import Video from './abis/Video.json'
// import Coin from './abis/ERC20.json'
import Multihash from './ipfsHash'
import Navbar from './components/pieces/Navbar'
import MyVideos from './components/pages/myvideos.component'
import Home from './components/pages/home.component'
import Explore from './components/pages/explore.component'
import DeepCoin from './components/pages/deepcoin.component'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

class App extends Component {

  async componentDidMount() {
    await this.loadWeb3()
    if (this.state.usingWallet) await this.loadBlockchainData()
  }

  constructor(props) {
    super(props)
    
    this.changePage = this.changePage.bind(this)
    this.setViewOriginal = this.setViewOriginal.bind(this)
    this.loadOriginalLinks = this.loadOriginalLinks.bind(this)

    this.state = {
      account: '', 
      buffer: null, 
      contract: null, 
      coinContract: null, 
      hash: null, 
      videos: null, 
      comparehash: null, 
      searchHash: null, 
      deepfake: null, 
      compareDeepfake: null, 
      timestamp: null, 
      compareTimestamp: null, 
      showCompare: false, 
      page: "home", 
      originalLinks: null, 
      viewOriginal: null, 
      fakeLink: null, 
      usingWallet: true
      // linkFake: null
    }
  }

  async loadWeb3() {
    let usingWallet
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      // window.alert('Please use metamask!')
      usingWallet = false
      this.setState({ usingWallet })
    }
    if (usingWallet) {
      window.ethereum.on('accountsChanged', (account) => {
        this.setState({ account: account[0] })
      })
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Video.networks[networkId]
    if (networkData) {
      const videoAbi = Video.abi
      // const coinAbi = Coin.abi
      const address = networkData.address
      const contract = web3.eth.Contract(videoAbi, address)
      // const coinContract = web3.eth.Contract(coinAbi, address)
      this.setState({
        contract: contract, 
        // coinContract: coinContract
      })
    } else {
      window.alert('Smart contract not deployed to detected network!')
    }
  }

  changePage(e) {
    this.setState({
      page: e.target.id
    })
  }

  markAsDeepfake = async (event) => {
    const deepfakeHash = Multihash.getBytes32FromMultihash(event.target.value)
    // this.state.contract.methods.markAsDeepfake(
    
    // ).send({ from: this.state.account })
  }

  async loadOriginalLinks(fakeDigest) {
    let len = await this.state.contract.methods
          .getOriginalLinksCount(fakeDigest).call()
    len = parseInt(len['_hex'], 16) 
    let originalLinks = []
    for (let i = 0; i < len; i++) {
      let link = await this.state.contract.methods
            .getOriginalLinks(fakeDigest, i).call()
      // TODO: build size and hash function into smart contract
      // so you don't have to default here
      const multihash = Multihash.getMultihashFromBytes32([link['0'], 18, 32])
      const supportCount = parseInt(link['1']['_hex'], 16) 
      originalLinks.push({multihash, supportCount})
    }
    this.setState({ originalLinks })
  }

    // if just pressing back button, don't send digest
  setViewOriginal(e, viewOriginalPage) {
    const viewOriginal = this.state.viewOriginal
    if (viewOriginalPage) {
      let fakeDigest = Multihash.getBytes32FromMultihash(e.target.getAttribute("value"))['digest']
      let fakeLink = e.target.getAttribute("value")
      this.setState({ fakeLink })
      this.loadOriginalLinks(fakeDigest)
    } 
    this.setState({ viewOriginal: !viewOriginal })
  }

  render() {
    let pageProps = {
      account: this.state.account, 
      contract: this.state.contract, 
      page: this.state.page, 
      originalLinks: this.state.originalLinks,
      setViewOriginal: this.setViewOriginal, 
      viewOriginal: this.state.viewOriginal
    }

    // FIXME: why is render method called 3 times (confirm with console.log)
    let pageContent; 
    if (this.state.usingWallet === false || this.state.page === "home") {
      pageContent = <Home />
    } else if (this.state.page == "myVideos") {
      pageContent = <MyVideos {...pageProps} ipfs={ipfs} />
    } else if (this.state.page == "exploreDeepfakes") {
      pageContent = <Explore {...pageProps} markAsDeepfake={this.markAsDeepfake} />
    } else if (this.state.page == "exploreOriginals") {
      pageContent = <Explore {...pageProps} markAsDeepfake={this.markAsDeepfake} />
    } else if (this.state.page == "deepCoin") {
      pageContent = <DeepCoin 
                      {...pageProps} 
                      coinContract={this.state.coinContract}
                    />
    } else {
      pageContent = <h1>Loading Videos...</h1>
    }
    // let pageContent = <h1>asdf</h1>

    return (
      <div>
        <Navbar 
          account={this.state.account} 
          changePage={this.changePage}
          usingWallet={this.state.usingWallet}
        />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center borderb">
              <div className="mr-auto ml-auto borderc">
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                {pageContent}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
