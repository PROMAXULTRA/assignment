const Web3 = require('web3');

class main {
	web3;
	constructor(projectId) {
		// test on Ropsten
		this.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/" + projectId));
	}

	async getNumber() {
		let block = await this.web3.eth.getBlock("latest");
		let isFind = false;
		while (true) {
			// console.log(block);
			if(block != null && block.transactions != null) {
				for(let txHash of block.transactions) {
					// console.log(txHash);
					let tx = await this.web3.eth.getTransaction(txHash);
					// console.log(tx);
					if(tx.to == null) {
						console.log("The number of the block is " + tx.blockNumber);
						console.log("The transaction Hash is " + txHash)
						isFind = true;
						break;
					}
				}
			}
			if(isFind) {
				break;
			}
			block = await this.web3.eth.getBlock(block.number - 1);

		}

	
	}
}

var projectId = "d348b73c722a41179aa1907a357d19bd";
let number = new main(projectId);
number.getNumber();
