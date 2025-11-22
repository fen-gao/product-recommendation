const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

server.use(router);

const PORT = process.env.PORT || 3001;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`JSON Server is running on port ${PORT}`);
  console.log(`Access your API at http://localhost:${PORT}`);
});
