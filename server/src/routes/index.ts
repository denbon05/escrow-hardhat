import { FastifyInstance } from "fastify";
import escrows from "./escrows";

const controllers = [escrows];

const registerRoutes = (app: FastifyInstance) =>
  controllers.forEach((f) => f(app));

export default registerRoutes;
