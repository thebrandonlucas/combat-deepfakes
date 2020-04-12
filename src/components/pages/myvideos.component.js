import React, { Component } from 'react';
import shortid from 'shortid'
import Multihash from '../../ipfsHash'
import VideoInfo from '../pieces/VideoInfo'
// import ViewOriginal from '../pieces/ViewOriginal'


export default class MyVideos extends Component {
	constructor(props) {
		super(props)

		this.state = {
			videoData: null, 
			buffer: null, 
			fakeLink: null, 
			originalLinks: null, 
			loading: false
		}
	}

	async componentDidMount() {
		await this.loadAuthorVideos()
	}

	async loadAuthorVideos() {
		let videoDataLength = await this.props.contract.methods.getAuthorVideoCount(this.props.account).call()
		if (videoDataLength !== null && videoDataLength !== 0) {
			videoDataLength = parseInt(videoDataLength['_hex'], 16) 
			let videoData = []; 
			for (let i = 0; i < videoDataLength; i++) {
				let currentVideoData = await this.props.contract.methods.getAuthorVideoData(this.props.account, i).call()
				let multihash = [currentVideoData['0'], currentVideoData['1'], currentVideoData['2']];
				multihash = Multihash.getMultihashFromBytes32(multihash)
				let timestamp = currentVideoData['3']
				let fakeMarks = parseInt(currentVideoData['4']['_hex'], 16)
				videoData.push({'multihash': multihash, 'timestamp': timestamp, 'fakeMarks': fakeMarks})
			}
			this.setState({ videoData })
		} 
	}

	captureFile = async (event) => {
		event.preventDefault()
		const file = event.target.files[0]
		const reader = new window.FileReader()
		reader.readAsArrayBuffer(file)
		reader.onloadend = () => {
		  this.setState({ buffer: Buffer(reader.result)})
		}
	}

	// Example hash: QmczkQ57DfWTghtjbpXoSRAYKDRSPmvBbmzBcGbkc2KrG6
	// example url: 'https://ipfs.infura.io/ipfs/QmczkQ57DfWTghtjbpXoSRAYKDRSPmvBbmzBcGbkc2KrG6'
	onSubmit = (event) => {
		event.preventDefault()
		this.setState({ loading: true })
		this.props.ipfs.add(this.state.buffer, async (error, result) => {
			if (error) throw error
			const hash = Multihash.getBytes32FromMultihash(result[0].hash)
			// TODO: merge two 'send's in one function?
			// FIXME: should set time function be implemented in javascript or solidity?

			this.props.contract.methods.setVideoData(
				this.props.account,
				hash.digest,
				hash.hashFunction,
				hash.size
			).send({ from: this.props.account })
		})
		// this.setState({ loading: false })
		// TODO: manually reload page after metamask popup
		// TODO: create loading message for video upload
		// test2: QmSWFUN7CBW4EFGQxNVtHkxdUr4QBy78nhnPxVnSVy8kUD
	}

	render() {
		return (
			<div>
			{
				// TODO: allow viewing marked fakes from "myvideos" page
				// this.props.viewOriginal 
				// ? <ViewOriginal />
				// : <h1>Add Video</h1>
				<div>
					
	                { 
	                	this.state.loading === true
						? 
						<h1>
							Loading video to IPFS. This may take awhile...
							<br />
							Reload window after MetaMask transaction
						</h1>
						:
						<div>
							<h1>Add Video</h1>
							<p>&nbsp;</p>
			                <form onSubmit={this.onSubmit}>
			                  <input type="file" onChange={this.captureFile} />
			                  <input type="submit" />
			                </form> 
		                </div>
	                }
	                <p>&nbsp;</p>
					<div className="row">
						{
							this.state.videoData != null
							? this.state.videoData.map((data) => {
							  return (
							    <div className="col-sm" key={shortid.generate()}>
							      <VideoInfo data={data} setViewOriginal={this.props.setViewOriginal} />
							    </div>
							  )})
							: <h1>No Videos uploaded yet!</h1>
						}
					</div>
				</div>
			}
			</div>
		)
	}
}