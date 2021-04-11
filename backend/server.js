import express from "express";
import data from "./seeds.js";

const app = express();

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/", (req, res) => {
  res.send("Server is ON!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is at http://localhost:${port}`);
});
