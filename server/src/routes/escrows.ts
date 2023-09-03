import { FastifyInstance } from "fastify";
import type { CreateContract, UpdateContract } from "@root/types/escrows";
import { omit } from "lodash";

export default (app: FastifyInstance) => {
  app
    .post<{ Body: CreateContract }>("/escrow", async ({ body }, reply) => {
      try {
        return app.knex("escrows").insert({
          ...omit(body, "chainId"),
          chain_id: body.chainId,
        });
      } catch (err) {
        app.log.error(err);
        reply.code(500).send(err.message);
      }
    })

    .patch<{ Body: UpdateContract }>(
      "/escrow",
      async ({ body: { isApproved, address } }, reply) => {
        try {
          return app
            .knex("escrows")
            .update({
              is_approved: isApproved,
            })
            .where({
              address,
            });
        } catch (err) {
          app.log.error(err);
          reply.code(500).send(err.message);
        }
      },
    )

    .get("/escrows", async (req, reply) => {
      try {
        const escrows = await app.knex("escrows");
        return escrows;
      } catch (err) {
        app.log.error(err);
        reply.code(500).send(err.message);
      }
    });
};
