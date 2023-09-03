import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("escrows", (table) => {
    table.string("address").primary();
    table.string("arbiter").notNullable();
    table.string("beneficiary").notNullable();
    table.string("deposit").notNullable().comment("Value in Hex Wei");
    table.boolean("is_approved").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("escrows");
}
