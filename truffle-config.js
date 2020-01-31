require('babel-register');
require('babel-polyfill');


var HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = 'bonus praise flower copy ahead wreck dog all erosion absent donor circle'
const API_KEY = '6eec03fc82e0451b8ce49ef9da96453a'

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      from: "0x4cB7a390728d9B8407DD9E7e4b87ad4040Fe92dE",
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/"+API_KEY)
      },
      network_id: 3,
      gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      // version: "0.5.6",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
