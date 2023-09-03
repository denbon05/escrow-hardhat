import { FastifyInstance } from "fastify";
import connectToDB, { Knex } from "knex";

const knexPlugin = (
  fastify: FastifyInstance,
  options: Knex.Config,
  done: () => void,
) => {
  if (!fastify.knex) {
    const knex = connectToDB(options);
    fastify.decorate("knex", knex);

    fastify.addHook("onClose", (fastify, done) => {
      if (fastify.knex === knex) {
        fastify.knex.destroy(done);
      }
    });
  }

  done();
};

export default knexPlugin;
