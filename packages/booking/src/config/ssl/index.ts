import fs from "fs";

export const key = fs.readFileSync(`${__dirname}/server.key`);

export const cert = fs.readFileSync(`${__dirname}/server.crt`);
