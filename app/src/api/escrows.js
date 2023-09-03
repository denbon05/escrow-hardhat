// @ts-check
import Axios from "axios";
import { ethers } from "ethers";
import { provider } from "./eth";
import Escrow from "../artifacts/contracts/Escrow.sol/Escrow.json";

/** @typedef { import('../../../types/escrows').CreateContract} CreateContract */

const axios = Axios.create({
  baseURL: "http://127.0.0.1:2000",
});

async function approve(escrowContract) {
  const signer = provider.getSigner()
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

/**
 * @param {import('../../../types/escrows').UpdateContract} escrow
 */
const updateEscrow = async (escrow) => await axios.patch('/escrow', escrow);

export async function deploy({
  arbiter,
  beneficiary,
  value,
}) {
  const signer = await provider.getSigner()
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  );
  return factory.deploy(arbiter, beneficiary, { value });
}

/** @param {CreateContract} payload  */
export const addEscrow = async (payload) => axios.post("escrow", payload);

export const fetchEscrows = async () =>
  axios.get("escrows").then(({ data: escrows }) =>
    escrows.map(({
      isApproved,
      deposit,
      address,
      arbiter,
      beneficiary,
      chainId,
      sender,
    }) => ({
      chainId,
      sender,
      isApproved,
      address,
      arbiter,
      beneficiary,
      value: ethers.utils.formatEther(parseInt(deposit).toString()),
      handleApprove: async () => {
        const escrowContract = new ethers.Contract(
          address,
          Escrow.abi,
          provider,
        );

        escrowContract.on("Approved", () => {
          const escrowEl = document.getElementById(address);
          if (escrowEl) {
            escrowEl.className = "complete";
            escrowEl.innerText = "✓ It's been approved!";
          }
        });

        await approve(escrowContract);
        await updateEscrow({
          address: address,
          isApproved: true,
        })
      },
    })),
  );
