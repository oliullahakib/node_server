import type { IncomingMessage, ServerResponse } from "node:http";
import productController from "../controllers/products.controller";
import sendResponse from "../utils/sendResponse";


const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    sendResponse(res,200,true,"Welcome to the Server")
    // res.writeHead(200, { "Content-Type": "application/json" });
    // res.end(JSON.stringify({ message: "Welcome to the Server" }));
  } else if (url?.startsWith("/products")) {
   productController(req,res)
  } else {
    sendResponse(res,404,false,"This route is not define")
  }
};

export default routeHandler;
