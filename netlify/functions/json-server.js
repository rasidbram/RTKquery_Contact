const serverless = require("serverless-http");
const jsonServer = require("json-server");
const path = require("path");
const express = require("express");

const app = express();

const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

app.use((req, res, next) => {
	console.log(`Received request: ${req.method} ${req.path}`);
	next();
});

app.use(middlewares);
app.use(router);

module.exports.handler = serverless(app);
