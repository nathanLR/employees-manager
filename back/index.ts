import http from "http";
import { _PORT_ } from "./assets/config";
import Router from "./logic/routes";

const server = http.createServer(Router);

server.listen(_PORT_, "localhost", 20, () => {
  console.log(`server is running on port ${_PORT_}`);
});
