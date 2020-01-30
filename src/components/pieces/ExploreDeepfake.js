import React, { Component } from 'react';
import shortid from 'shortid'
import VideoInfo from './VideoInfo'

export default class ExploreList extends Component {
	render() {
		return(
			this.props.videoData != null
			? (
			this.props.videoData.map((data, index) => {
				return (
					<div className="col-sm" key={shortid.generate()}>
						<VideoInfo data={data} setViewOriginal={this.props.setViewOriginal} />
						<p key={shortid.generate()}>Author: {data.author}</p>
						<button 
							key={shortid.generate()} 
							value={JSON.stringify(data)} 
							onClick={this.props.linkFake}
						>
							Mark as Deepfake
						</button>
					</div>
				)})
			)
			: <h1>No one has uploaded any videos!</h1>
		)
	}
}