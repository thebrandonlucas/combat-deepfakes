import React, { Component } from 'react';
import shortid from 'shortid'

export default class ViewOriginal extends Component {
	render() {
		console.log('orig', this.props.originalLinks)
		return(
			<div >
				<h3>The video</h3><h3><b>{this.props.fakeLink}</b></h3><h3> was linked to the following video(s):</h3>
				{
					this.props.originalLinks != null 
					? this.props.originalLinks.map((link) => {
						return <div key={shortid.generate()}>
							<video 
								key={shortid.generate()}
								src={`https://ipfs.infura.io/ipfs/${link.multihash}`} 
								controls 
								className="comparevideo">
							</video>
							<p className="row justify-content-center" key={shortid.generate()}>{link.multihash}</p>
							<p className="row justify-content-center" key={shortid.generate()}>Support Count: {link.supportCount}</p>
						</div>
					})
					: <h1>Nothing to see here!</h1>
				}
				<button onClick={(e) => this.props.setViewOriginal(e, false)}>Back</button>
			</div>
		)
	}
}