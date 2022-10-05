const HDWalletProvide = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvide(
    'tell busy pair broom dose auto wheat switch action scheme kid tired',
    'https://rinkeby.infura.io/v3/222b0a442b334caaa2517ab9115e91c3'
);

const web3 = new Web3(provider);

const deploy = async() => {

    //get list of all accounts
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    //use one account to deploy the contract
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments:['Hi there']})
        .send({from: accounts[0], gas: '1000000'});

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};

deploy();