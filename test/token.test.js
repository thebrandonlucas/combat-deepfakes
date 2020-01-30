const Token = artifacts.require("MyERC20")

require('chai')
	.use(require('chai-as-promised'))
	.should()

contract('MyERC20', (accounts) => {
	let token

	before(async () => {
		token = await Token.deployed()
	})

	describe('deployment', async () => {
		it('deploys successfully', async () => {
			const address = token.address 
			assert.notEqual(address, '')
			assert.notEqual(address, 0x0)
			assert.notEqual(address, undefined)
			assert.notEqual(address, null)
		})
	})

	describe('view', async () => {
		it('receives name', async () => {
			const result = await token.name()
			assert.equal(result, 'BranjoCoin')
		})
	})

	// describe('storage', async () => {
	// 	it('transfers successfully', async () => {
	// 		let transferFrom = ''
	// 		memeHash = 'abc123'
	// 		await meme.set(memeHash)
	// 		const result = await meme.get()
	// 		assert.equal(result, memeHash)
	// 	})
	// })
})