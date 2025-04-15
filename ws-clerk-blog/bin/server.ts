import http from "node:http";
import { app } from "../src/app.ts";

const port = 4_000;

app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`🚀 Listening on port ${port}`);
});
