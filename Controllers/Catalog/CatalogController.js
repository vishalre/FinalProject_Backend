import {
    findAllCatalogs,
    createCatalog,
    deleteCatalog,
} from "../../DAO/CatalogsDao.js";
import authenticate from "../../Middleware/authenticate.js";
import {findOneUserUdao} from "../../DAO/UserDao.js";

const findAllCatalogsMethod = async (req, res) => {
    const catalogs = await findAllCatalogs();
    res.json(catalogs);
  };

const CatalogController = (app) => {
    app.get("/api/catalogs", findAllCatalogsMethod);

    app.post("/api/catalogs/remove", authenticate, async (req, res) => {
        const user = await findOneUserUdao(req.body.id);
        if (user.type !== "Admin") {
            res.json({ success: false});
            return;
        }
        const out = await deleteCatalog(req.body.catalogId)
        res.json({success:true, message: "catalog removed" });
    });

    app.post("/api/catalogs/create", authenticate, async (req, res) => {
        const user = await findOneUserUdao(req.body.id);
        if (user.type !== "Dealer" && user.type!=='Admin') {
            res.json({ success: false});
            return;
        }
        const out = await createCatalog({catalogName:req.body.catalogName});
        res.json(out);
    });


};
export default CatalogController;
