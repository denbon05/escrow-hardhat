import { CreateContract } from "@root/types/escrows";

declare module "knex/types/tables" {
  type Escrow = CreateContract & {
    id: number;
    is_approved: boolean;
    created_at: string;
    sender: string;
    chain_id: string;
  };

  interface Tables {
    escrows: Escrow;
  }
}
