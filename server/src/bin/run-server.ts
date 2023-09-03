#!/usr/bin/env ts-node
import getServer from "../";

const server = getServer();
const port = 2000;

server.listen({ port }).catch((err) => {
  server.log.error(err);
  process.exit(1);
});
