import * as http from "http";

const server = http.createServer((_, res) => {
  res.end("Hello, world!");
});

server.listen(3000, (err: Error) => {
  if (err) {
    throw new Error("Error starting server");
  }

  console.log("Server started on port 3000");
});
