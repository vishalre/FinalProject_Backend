import {
    findCartOfUser,
    deleteFromCart,
    addToCart,
    updateCart,
    addToOrder, findOrderByUser
} from "../../DAO/CartDao.js";

import authenticate from "../../Middleware/authenticate.js";
import {findOneUserUdao} from "../../DAO/UserDao.js";

const findUserCart = async (req, res) => {

    const cart = await findCartOfUser(req.params["uid"]);
    res.json(cart);
};

const CatalogController = (app) => {
    app.get("/api/cart/:uid", findUserCart);

    app.post("/api/cart/remove/", async (req, res) => {
        console.log(JSON.stringify(req.body.pid))
        const out = await deleteFromCart(req.body.pid);
        res.json({ success: true});
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

    app.post("/api/order/add", async (req, res) =>{
        const out = await addToOrder(req.body.order);
        res.json({ success: true, order: out });
    });

    app.get("/api/orders/:uid", async (req, res) =>{
        const out = await findOrderByUser(req.params["uid"]);
        res.json({ success: true, order: out });
    });

};
export default CatalogController;
