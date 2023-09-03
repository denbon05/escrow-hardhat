export type CreateContract = {
  address: string;
  arbiter: string;
  beneficiary: string;
  deposit: string;
  sender: string;
  chainId: string;
};

export type UpdateContract = Pick<CreateContract, "address"> & {
  isApproved: boolean;
};
