import { ethers } from "ethers";

/**
 * @type {import('ethers').providers.AlchemyProvider | import('ethers').providers.Web3Provider}
 */
export const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
