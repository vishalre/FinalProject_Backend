import {
  findAllProductPdao,
  createProductPdao,
  deleteProductPdao,
  findOneProductPdao,
  findProductByNamePdao, findProductByASINdao,
} from "../../DAO/ProductsDao.js";
import { findOneUserUdao } from "../../DAO/UserDao.js";
import authenticate from "../../Middleware/authenticate.js";
import mongoose from "mongoose";

const ProductsController = (app) => {
  app.post("/api/product", async (req, res) => {
    let productObjectId = req.body.id;
    if (!mongoose.Types.ObjectId.isValid(productObjectId)) {
      // Fetch object id
      productObjectId = await findProductByASINdao(req.body.id);
      productObjectId = productObjectId._id;
    }
    const out = await findOneProductPdao(productObjectId);
    res.json({ success: true, products: out });
  });

  app.post("/api/products", authenticate, async (req, res) => {
    const user = await findOneUserUdao(req.body.id);
    if (user.type !== "Dealer") {
      res.json({ success: false, products: {} });
      return;
    }
    const out = await findAllProductPdao();
    res.json({ success: true, products: out });
  });

  app.post("/api/add-product", authenticate, async (req, res) => {
    const user = await findOneUserUdao(req.body.id);
    // TODO
    /*if (user.type !== "Dealer") {
      res.json({ success: false, products: {} });
      return;
    }*/
    const out = await createProductPdao(req.body.product);
    res.json({ success: true, products: out });
  });

  app.post("/api/remove-product", authenticate, async (req, res) => {
    const user = await findOneUserUdao(req.body.id);
    if (user.type !== "Dealer") {
      res.json({ success: false, products: {} });
      return;
    }
    const out = await deleteProductPdao(req.body.pid);
    res.json({ success: true, products: out });
  });

  app.post("/api/search-products", async (req, res) => {
    const out = await findProductByNamePdao(req.body.name);
    res.json({ success: true, products: out });
  });
};
export default ProductsController;
