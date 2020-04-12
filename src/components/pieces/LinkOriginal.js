import React, { Component } from 'react';
import Multihash from '../../ipfsHash'

export default class LinkOriginal extends Component {
	constructor(props) {
		super(props)

		this.onSearchChange = this.onSearchChange.bind(this)
		this.markAsDeepfake = this.markAsDeepfake.bind(this)

		this.state = {
			tempSearch: "",
			submitSearch: ""
		}
	}

	onSearchChange(e) {
		this.setState({
			tempSearch: e.target.value
		})
	}

	search = async (e) => {
		e.preventDefault()
		// let originalData = await this.props.
		this.setState({
			submitSearch: this.state.tempSearch
		})
	}

	async markAsDeepfake() {
		const fakeDigest = Multihash.getBytes32FromMultihash(this.props.linkedFake['multihash'])['digest']
		let originalDigest = Multihash.getBytes32FromMultihash(this.state.submitSearch)['digest']
		// FIXME: is there a better way to catch require() failures 
		this.props.contract.methods.markAsDeepfake(fakeDigest, originalDigest)
		.send({ from: this.props.account })
		.catch(() => {
			alert("Error: user " + this.props.account + " has already marked this video as a fake.")
		})
	}

	render() {
		return(
			<div>
				{
					this.state.linkedFake === "" &&
					<div className="row justify-content-center">
						<p>Link fake video to original by searching Qmhash</p>
					</div>
				}
				<div className="row justify-content-center">
					<input 
						placeholder="Enter Qm Hash" 
						value={this.state.tempSearch}
						onChange={this.onSearchChange} 
						className="search-compare" 
						type="text" 
					/>
					<button onClick={this.search}>Submit</button>
				</div>
				<div className="row justify-content-center">
					<p>&nbsp;</p>
					<div className="col-sm-6">
						<h3>Mark as Fake</h3>
						<video 
							src={`https://ipfs.infura.io/ipfs/${this.props.linkedFake['multihash']}`} 
							controls 
							className="comparevideo">
						</video>
						<p>{this.props.linkedFake['multihash']}</p>
					</div>
					{
						this.state.submitSearch !== "" &&
						<div className="col-sm-6">
							<h3>with below as Original?</h3>
							<video 
								src={`https://ipfs.infura.io/ipfs/${this.state.submitSearch}`} 
								controls 
								className="comparevideo">
							</video>
							<p>{this.state.submitSearch}</p>
						</div>
					}
				</div>
				<div className="row justify-content-center">
					<button onClick={this.markAsDeepfake}>Mark as Deepfake</button>
				</div>
			</div>
		)
	}
}