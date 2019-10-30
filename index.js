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

    isValideted(){
        for(var i =1;i<this.chain.length;i++){
            var currentBlockHash=this.chain[i];
            var previousBlockHash=this.chain[i-1];
            if(currentBlockHash.hash !== currentBlockHash.calculateHash()){
                var data={
                    "Message":"Sorry !!!!!!!!!!!!!! You are unauthorised",
                    "Info":"Go TO pavilion !!!!!!!!!!!!!!!!!!!!!!!!",
                }
                return data;
            }
            if(currentBlockHash.prevHash !== previousBlockHash.hash){
                var data={
                    "Message":"Sorry !!!!!!!!!!!!!! You are unauthorised",
                    "Info":"Go TO pavilion !!!!!!!!!!!!!!!!!!!!!!!!",
                }
                return data;
            }
            var data={
                "Message":"Congratulation You are Authorised User",
                "Info":this.chain,
            }
            return data;
        }
    }
}

const ChainTree=new BlockChain();

//create Block instance 
const block = new Block("12-10-19",{amount:100});

//block added out chain 
ChainTree.addBlock(block);
// console.log(ChainTree.isValideted());

ChainTree.chain[0].hash="Hacked";
console.log(ChainTree.isValideted());
