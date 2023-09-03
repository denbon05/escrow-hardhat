import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("escrows", (table) => {
    table.string("sender").notNullable().comment("Sender address");
    table.string("chain_id").notNullable().comment("Hexadecimal chain ID");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("escrows", (table) => {
    table.dropColumn("sender");
    table.dropColumn("chain_id");
  });
}
