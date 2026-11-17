import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from "node:http";
import routeHandler from "./routes/routes";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // console.log("request--->",req) Incoming message
    // console.log("response--->",res) ServerResponse
    routeHandler(req,res)
  },
);


server.listen(8000, () => {
  console.log("Listening on 8000");
});
