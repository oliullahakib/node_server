import type { IncomingMessage } from "node:http";

const bodyParser = (req: IncomingMessage):Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end",()=>{
        try {
            resolve(JSON.parse(body))
        } catch (error) {
            reject(error)
        }
    })
  });
};

export default bodyParser
//"abc" ---> "a" "b" "c"
