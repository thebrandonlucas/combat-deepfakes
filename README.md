# Aion - Combating Deepfakes with Blockchain

This is an evolving project that is designed to combat the proliferation of deepfake videos and begin restoring trust in video integrity through the use of blockchain and timestamps. 

Visit [combat-deepfakes.herokuapp.com](https://combat-deepfakes.herokuapp.com/) to test the Dapp. 

To learn more about this project, visit this *article*. 

## Building Locally

- Tools
	- Install [npm](https://nodejs.org/en/download/)
	- Install [MetaMask](https://metamask.io/)
	- Install [Ganache](https://www.trufflesuite.com/ganache) to simulate a local blockchain instance. In MetaMask, add the localhost network HTTP.//127.0.0.1:7545 to connect it to Ganache by clicking on the network dropdown at the top and choosing "Custom RPC"

- Setup
	- Clone this repository. 
	- Open Ganache and choose "Quickstart"
	- `npm install`
	- `npm audit fix` (if necessary)
	- `npm start`

- Usage
	- Uploading a video: 
		- A MetaMask popup will appear asking you to connect to the app. Click "Confirm"
		- Under "My Videos" in the Dapp, choose a video file and click submit. This will load the video to IPFS and add your video's unique IPFS hash to the blockchain. You'll have to confirm the transaction via MetaMask. Refresh the page after MetaMask confirmation
		- You can now view your video under "My Videos" or by finding it in "Explore"
	- Marking a video as a fake: 
		- Under the "Explore" tab, find a video that you believe is a fake
		- Copy the QmHash of the original video
		- Click "Mark as Deepfake" and enter the QmHash of the original video in the input box and click "submit". Confirm that the original and fake video is correct and click "Mark as Deepfake" when finished. 


