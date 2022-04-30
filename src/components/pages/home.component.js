import React, { Component } from 'react';
// import shortid from 'shortid'

export default class Home extends Component {
	render() {
		return (
			<div className="content">
				<h1>Combating Deepfakes</h1>
				<p>This Dapp attempts to use the Ethereum blockchain and IPFS to help solve the Deepfake problem</p>
				<p className="warning">WARNING: This is a work in progress</p>
				<h3>What are Deepfakes?</h3>
				<p>Read more about them&nbsp;
					<a href="https://goberoi.com/exploring-deepfakes-20c9947c22d9">here</a>
				</p>
				<h3>How do I use this Dapp?</h3>
				<div>
					<p>If you haven't yet, install&nbsp;<a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">MetaMask</a></p>
                    <p>After installing MetaMask, ensure you are on the Ropsten network and have some funds.</p>
					<p>Continue with instructions below after setting up MetaMask and connecting to this Dapp</p>
					<h5>To upload a video</h5>
					<ol>
						<li>Click on "My Videos"</li>
						<li>Choose and add the appropriate file</li>
						<li>Pay Fee to place video's IPFS hash on the blockchain</li>
						<li>Your video should appear in "My Videos" and under "Explore Originals"</li>
					</ol>
					<h5>To mark a video as a Deepfake</h5>
					<ol>
						<li>Go to "Explore"</li>
						<li>
							If you see a video that isn't an original and you can find the video it links to, 
							copy the QmHash of the original video and then click "Mark as Deepfake"
						</li>
						<li>Enter the QmHash of the original in the search box, and mark that video as a fake</li>
						<li>
							Click on "Explore" in the navbar and find your video. 
							You should now see that it's "FakeMark" count has increased
						</li>
					</ol>
				</div>
				
				<h3>How can I contribute?</h3>
				<p>
					I'd love to have help whether it's on improving the code or the idea itself. <br />
					Please go to the&nbsp;
					<a href="https://github.com/thebrandonlucas/combat-deepfakes-blockchain/" target="_blank" rel="noopener noreferrer">
						Github
					</a>
					&nbsp;or send me an email at&nbsp;
					<a href="mailto:thebrandonlucas@gmail.com">
						thebrandonlucas@gmail.com
					</a>
				</p>
			</div>
		)
	}
}