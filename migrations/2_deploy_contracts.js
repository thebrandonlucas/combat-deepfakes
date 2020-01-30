const Video = artifacts.require("Video");
// const ERC20 = artifacts.require("ERC20"); 

module.exports = function(deployer) {
  deployer.deploy(Video);
  // deployer.deploy(ERC20); 
};
