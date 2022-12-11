import {
    findCartOfUser,
    deleteFromCart,
    addToCart,
    updateCart
} from "../../DAO/CartDao.js";

import authenticate from "../../Middleware/authenticate.js";
import {findOneUserUdao} from "../../DAO/UserDao.js";

const findUserCart = async (req, res) => {

    const cart = await findCartOfUser(req.params["uid"]);
    res.json(cart);
};

const CatalogController = (app) => {
    app.get("/api/cart/:uid", findUserCart);

    app.post("/api/cart/remove/:id", async (req, res) => {

        const out = await deleteFromCart(req.body.id);
        res.json({ success: true, remove: {} });
    });

    app.post("/api/cart/add", async (req, res) => {
        console.log("cart:" + JSON.stringify(req.body.cart));
        const out = await addToCart(req.body.cart);
        res.json({ success: true, products: out });
    });


    app.post("/api/cart/update", async (req, res) => {
        const user = await findOneUserUdao(req.body.id);
        const out = await updateCart(req.body.id, req.body.cart);
        res.json({ success: true, products: out });
    });

};
export default CatalogController;
