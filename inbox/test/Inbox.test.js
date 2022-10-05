// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const init_message = 'Hi there';

beforeEach(async () => {
    //get list of all accounts
    accounts = await web3.eth.getAccounts();

    //use one account to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments:[init_message]})
        .send({from: accounts[0], gas: '1000000'});
    
});


describe('Inbos', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('sets a message', async () => {
        const result = await inbox.methods.message().call();
        assert.equal(init_message, result);
    });

    it('updates', async () => {
        await inbox.methods.setMessage('updated').send({from: accounts[0]});
        const result = await inbox.methods.message().call();
        assert.equal('updated', result);
    });
});