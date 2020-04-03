require("dotenv").config();
const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const schema = require("./schema/schema");

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("db connected successfully");
  }
);

const app = express();

// Enable cross origin request
app.use(cors());

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.get("/", (request, response) => {
  response.send(
    "<h1>Hello this is a little server for our comming soon page</h1>"
  );
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server up and running http://localhost:${PORT}`);
});
