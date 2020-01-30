import React, { Component } from 'react';
import shortid from 'shortid'

export default class VideoInfo extends Component {
	render() {
		return(
			<div>
				<video 
					key={shortid.generate()}
					src={`https://ipfs.infura.io/ipfs/${this.props.data.multihash}`} 
					controls 
					className="comparevideo">
				</video>
				<p key={shortid.generate()}>{this.props.data.multihash}</p>
				<p key={shortid.generate()}>
					{
						new Date(this.props.data.timestamp * 1000)
							.toLocaleString().slice(0, 22)
							.replace('T', ' ')
					}
				</p>  
				<a 
					key={shortid.generate()} 
					href="#fakeMarks" 
					value={this.props.data.multihash} 
					onClick={(e) => this.props.setViewOriginal(e, true)}
				>
					FakeMarks: {this.props.data.fakeMarks}
				</a>
			</div>
		)
	}
}