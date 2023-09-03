import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import fastifyCors from "@fastify/cors";
import registerKnex from "./knex";
import knexConfig from "../../knexfile";

const registerPlugins = (app: FastifyInstance) => {
  app.register(fp(registerKnex), knexConfig);
  app.register(fastifyCors, {
    origin: true,
  });
};

export default registerPlugins;
