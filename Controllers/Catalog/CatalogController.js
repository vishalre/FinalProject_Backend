import {
    findAllCatalogs,
    createCatalog,
    deleteCatalog,
} from "../../DAO/CatalogsDao.js";
import authenticate from "../../Middleware/authenticate.js";
import {findOneUserUdao} from "../../DAO/UserDao.js";

const findAllCatalogsMethod = async (req, res) => {
    const catalogs = await findAllCatalogs();
    console.log('hello')
    res.json(catalogs);
  };

const CatalogController = (app) => {
    app.get("/api/catalogs", findAllCatalogsMethod);

    app.post("/api/catalogs/remove/:id", authenticate, async (req, res) => {

        const user = await findOneUserUdao(req.body.id);
        if (user.type !== "Admin") {
            res.json({ success: false, products: {} });
            return;
        }
        const out = await deleteCatalog(req.params["id"])
        res.json({ success: true, remove: {} });
    });

    app.post("/api/catalogs/create", authenticate, async (req, res) => {
        const user = await findOneUserUdao(req.body.id);
        if (user.type !== "Dealer") {
            res.json({ success: false, products: {} });
            return;
        }
        const out = await createCatalog(req.body.catalog);
        res.json({ success: true, products: out });
    });


};
export default CatalogController;
