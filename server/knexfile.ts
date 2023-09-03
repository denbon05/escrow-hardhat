import type { Knex } from "knex";
import { camelCase, omit } from "lodash";
import { join } from "path";

const migrationsDirpath = join(__dirname, "migrations");

const toCamelCase = (item: Record<string, any>) =>
  Object.entries(item).reduce<Record<string, any>>(
    (acc, [key, value]) => ({
      ...omit(acc, key),
      [camelCase(key)]: value,
    }),
    {},
  );

const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: "./sqlite3",
  },
  migrations: {
    directory: migrationsDirpath,
    extension: "ts",
  },
  useNullAsDefault: true,
  // overly simplified snake_case -> camelCase converter
  postProcessResponse: (result, queryContext) => {
    if (Array.isArray(result)) {
      return result.map(toCamelCase);
    } else {
      return toCamelCase(result);
    }
  },
};

export default config;
