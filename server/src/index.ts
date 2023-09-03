import Fastify from "fastify";
import registerPlugins from "./plugins";
import registerRoutes from "./routes";

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "SYS:HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  },
});

const getServer = () => {
  registerPlugins(fastify);

  fastify.after(() => {
    registerRoutes(fastify);
  });

  return fastify;
};

export default getServer;
