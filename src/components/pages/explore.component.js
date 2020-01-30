import React, { Component } from 'react'
import Multihash from '../../ipfsHash'
import ExploreList from '../pieces/ExploreList'
import LinkOriginal from '../pieces/LinkOriginal'
import ViewOriginal from '../pieces/ViewOriginal'

export default class Explore extends Component {
	constructor(props) {
		super(props)

		this.linkFake = this.linkFake.bind(this)

		this.state = {
			videoData: null, 
			linkedFake: null, 
			viewOriginal: false, 
			fakeDigest: null, 
			fakeLink: null, 
			originalLinks: null
		}
	}

	async componentDidMount() {
		await this.loadVideos()
	}

	async loadVideos() {
		let authors = await this.props.contract.methods.getAuthors().call()
		if (authors !== null && authors.length > 0) {
			let videoData = []; 
			for (let i = 0; i < authors.length; i++) {
				let videoCount = await this.props.contract.methods.getAuthorVideoCount(authors[i]).call()
				videoCount = parseInt(videoCount['_hex'], 16) 
				for (let j = 0; j < videoCount; j++) {
					let currentVideoData = await this.props.contract.methods.getAuthorVideoData(authors[i], j).call()
					let multihash = [currentVideoData['0'], currentVideoData['1'], currentVideoData['2']]
					multihash = Multihash.getMultihashFromBytes32(multihash)
					let timestamp = currentVideoData['3']
					let fakeMarks = parseInt(currentVideoData['4']['_hex'], 16)
					videoData.push({
						'multihash': multihash, 
						'timestamp': timestamp, 
						'fakeMarks': fakeMarks, 
						'author': authors[i], 
						'index': j
					})
				}
			}
			this.setState({ videoData })
		} 
	}

	linkFake(e) {
		this.setState({
			linkedFake: JSON.parse(e.target.value)
		})
	}

	render() {
		console.log('page', this.props.page)
		console.log('is this deepfakes?', this.props.page === "exploreDeepfakes")
		return (
			<div>
				{ 
					this.props.page === "exploreDeepfakes"
					? <h1>Coming soon...</h1>
					: <div>
						<div className="row justify-content-center">
							<h1>Original Videos</h1>
						</div>
						<p>&nbsp;</p>
						<div className="row">
							{
								this.props.viewOriginal
								? <ViewOriginal
									fakeLink={this.state.fakeLink}
									originalLinks={this.props.originalLinks}
									setViewOriginal={this.props.setViewOriginal}
								/>
								: this.state.linkedFake == null 
									? <ExploreList
										videoData={this.state.videoData}
										linkFake={this.linkFake}
										setViewOriginal={this.props.setViewOriginal}
									/>
									: <LinkOriginal 
										account={this.props.account}
										contract={this.props.contract}
										linkedFake={this.state.linkedFake}
									/>
							}
						</div>
					</div>
				}
			</div>
		)
	}
}