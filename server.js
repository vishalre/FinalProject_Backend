import express from "express";
import morgan from "morgan";
import bodyparser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import UsersController from "./Controllers/Users/UsersController.js";
import AddressController from "./Controllers/Address/AddressController.js";
import ProductsController from "./Controllers/Products/ProductsController.js";
import LikesController from "./Controllers/Likes/LikesController.js";
import ReviewsController from "./Controllers/Reviews/ReviewsController.js";
import CatalogController from "./Controllers/Catalog/CatalogController.js"
import CartController from "./Controllers/Cart/CartController.js"
const app = express();
const port = 4300;
app.set("port", port);

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
UsersController(app);
AddressController(app);
ProductsController(app);
LikesController(app);
ReviewsController(app);
CatalogController(app);
CartController(app);
app.use(express.static("static"));
app.use(morgan("dev"));
app.use((req, res) => {
  const err = new Error("Not Found");
  err.status = 404;
  res.json(err);
});

mongoose.connect("mongodb://localhost:27017/KVV", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
  app.listen(port, () => console.log(`SVR app listening on port ${port}!`));
});
