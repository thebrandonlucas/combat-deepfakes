import React, { Component } from 'react';
// import shortid from 'shortid'

export default class DeepCoin extends Component {
	constructor(props) {
		super(props)

		// this.loadCoins = this.loadCoins.bind(this)
		this.onAddressChange = this.onAddressChange.bind(this)
		this.onSendChange = this.onSendChange.bind(this)
		this.mintCoins = this.mintCoins.bind(this)
		this.getMinter = this.getMinter.bind(this)
		this.getBalance = this.getBalance.bind(this)

		this.state = {
			sendAddress: "", 
			sendCoins: ""
		}
	}

	async componentDidMount() {
		// await this.loadCoins()
	}

	onAddressChange(e) {
		this.setState({ sendAddress: e.target.value })
	}

	onSendChange(e) {
		this.setState({ sendCoins: e.target.value })
	}

	async mintCoins() {
		console.log(this.state.sendAddress)
		console.log(this.state.sendCoins)
		console.log(this.props.account)
		this.props.coinContract.methods.set("hello")
		.send( { from: this.props.account })
		.catch(() => {
			alert("Error: user " + this.props.account + " is not the minter.")
		})
		// this.props.coinContract.methods.transfer(this.state.sendAddress, this.state.sendCoins)
		// .send( { from: this.props.account })
		// .catch(() => {
		// 	alert("Error: user " + this.props.account + " is not the minter.")
		// })
	}

	async getMinter() {
		console.log(this.props.contract)
		console.log( await this.props.coinContract.methods.name().call())
let minter = await this.props.coinContract.methods.name().call()
		console.log(minter)
	}

	async getBalance() {
		// let coins = await this.props.coinContract.methods.checkBalance().call()
		let coins = await this.props.contract.methods.getAuthorCount().call()
		console.log(coins)

	}

	// async loadCoins() {
	// 	let coins = await this.props.contract.methods
	// }

	render() {
		return (
			<div>
				<h1>Coming soon...</h1>
				{
					/*
				<input 
					onChange={this.onAddressChange}
					value={this.state.sendAddress}
					placeholder="Address for minted coins..." 
					type="text"
				/>
				<input 
					onChange={this.onSendChange}
					value={this.state.sendCoins}
					placeholder="# of coins to mint..." 
					type="text"
				/>
				<button onClick={this.mintCoins}>Submit</button>
				<button onClick={this.getBalance}>get balance</button>
				<button onClick={this.getMinter}>get minter</button>
					*/
				}
			</div>
		)
	}
}