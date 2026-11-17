import type { ServerResponse } from "node:http";

const sendResponse = <T>(
  res: ServerResponse,
  statusCode: number,
  status: boolean,
  message: string,
  data?: T,
) => {
  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(
    JSON.stringify({
      status,
      message,
      data,
    }),
  );
};

export default sendResponse