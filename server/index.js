const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
require("dotenv").config();
const { auth } = require("express-oauth2-jwt-bearer");

const tenantBase = process.env.AUTH0_TENANT_BASE_URL;
const PORT = process.env.PORT || 3030;

const jwtCheck = auth({
  audience: process.env.AUTH0_UNIQUE_IDENTIFIER,
  issuerBaseURL: tenantBase,
  tokenSigningAlg: process.env.AUTH0_SIGNING_ALGO,
});

const app = express();
app.use(cors());

app.get("/public", (req, res) => {
  res.send("Public route");
});

app.get("/protected", jwtCheck, async (req, res) => {
  const authToken = req.auth?.token.split(" ");
  let result = await axios.get(`${tenantBase}userinfo`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  res.send({ userInfo: result.data, status: "Success" });
});

app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  res.status(status).send(message);
});

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
