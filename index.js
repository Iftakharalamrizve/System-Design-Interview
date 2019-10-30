const sha256=require('crypto-js/sha256');
class Block{

    constructor(timeStamp,data,prevHash="")
    {
        this.timeStamp=timeStamp;
        this.data=data;
        this.prevHash=prevHash;
        this.hash=this.calculateHash();
    }

    calculateHash()
    {
        return sha256(
            this.timeStamp+JSON.stringify(this.data)+this.prevHash
        ).toString();
    }
}

class BlockChain
{
    constructor(){
        this.chain=[this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block("2019-3-42","Abdul","0000");
    }

    //get latest element for prev hash

    getLatestElement(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.prevHash=this.getLatestElement().hash;
        newBlock.hash=newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

const ChainTree=new BlockChain();

//create Block instance 
const block = new Block("12-10-19",{amount:100});

//block added out chain 

ChainTree.addBlock(block);
console.log(ChainTree);