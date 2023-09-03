# Decentralized Escrow Application

This is an Escrow Dapp built with [Hardhat](https://hardhat.org/).

## Project Layout

There are three top-level folders:

1. `/app` - contains the front-end application with contracts
2. `/server` - contains server

## Back-End

`cd` into the `/server` directory and run `npm install`

## Front-End

`cd` into the `/app` directory and run `npm install`

Compile the contracts using `npx hardhat compile`. The artifacts will be placed in the `/app` folder, which will make it available to the front-end. This path configuration can be found in the `hardhat.config.js` file.

To run the local node run `make run-node`.
<a href="https://www.web3.university/article/how-to-build-a-react-dapp-with-hardhat-and-metamask" target="_blank">
Connect a wallet for local development.
</a>

To run the front-end application run `npm start` from the `/app` directory. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

After your wallet account is connected:

1. Insert <b>Arbiter</b> and <b>Beneficiary</b> addresses
2. Type a <b>deposit amount</b> in ETH
3. Click <b>DEPLOY</b> button
4. Confirm Wallet prompt
5. After <b>Arbiter</b> approve the transaction ETH will be transferred
