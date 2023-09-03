import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Escrow from "./Escrow";
import { addEscrow, fetchEscrows, deploy } from "./api/escrows";
import { provider } from "./api/eth";

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [errMsg, setErrMsg] = useState();

  useEffect(() => {
    const connectToWallet = async () => {
      const accounts = await provider.send('eth_requestAccounts', [])
      const [firstAccount] = accounts;
      if (!accounts.length) {
        setErrMsg('Please connect to a Wallet')
        console.warn('There are no accounts')
      } else if (firstAccount !== account) {
        setAccount(firstAccount)
      }
      const chainId = await provider.send('eth_chainId', []);
      setChainId(chainId);
    }

    connectToWallet()
      .then(fetchEscrows)
      .then(setEscrows);
  }, [account]);

  async function newContract() {
    setErrMsg("");
    const beneficiary = document.getElementById("beneficiary").value;
    const arbiter = document.getElementById("arbiter").value;
    const value = ethers.utils.parseEther(document.getElementById("eth").value);

    try {
      const escrowContract = await deploy({
        arbiter,
        beneficiary,
        value,
      });
      await addEscrow({
        address: escrowContract.address,
        arbiter,
        beneficiary,
        deposit: value.toHexString(),
        sender: account,
        chainId,
      });
      setEscrows(await fetchEscrows());
    } catch (err) {
      console.error(err);
      // extract short message
      const [msg] = err.message.match(/.+(?=\()/)
      setErrMsg(msg ?? err.message);
    }
  }

  return (
    <>
      <div className="contract">
        <div>
          <h3>Account: {account}</h3>
          <h4>Chain ID: {chainId}</h4>
        </div>
        <h1> New Contract </h1>
        <label>
          Arbiter Address
          <input
            type="text"
            id="arbiter"
            defaultValue="0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
          />
        </label>

        <label>
          Beneficiary Address
          <input
            type="text"
            id="beneficiary"
            defaultValue="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
          />
        </label>

        <label>
          Deposit Amount (ETH)
          <input type="text" id="eth" />
        </label>

        <div
          className="button"
          id="deploy"
          onClick={(e) => {
            e.preventDefault();

            newContract();
          }}
        >
          Deploy
        </div>
        {errMsg && <h3>{errMsg}</h3>}
      </div>

      <div className="existing-contracts">
        <h1> Existing Contracts </h1>

        <div id="container">
          {escrows.map((escrow) => {
            return <Escrow key={escrow.address} {...escrow} />;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
