import {findAllLikes, findLikesByUser} from "../../DAO/LikesDao.js";
import authenticate from "../../Middleware/authenticate.js";
import {findOneUserUdao} from "../../DAO/UserDao.js";
const findAllLikesMethod = async (req, res) => {
  const likes = await findAllLikes();
  res.json(likes);
};
const LikesController = (app) => {
  app.get("/api/likes", findAllLikesMethod);

  app.post("/api/likes-by-user", authenticate, async (req, res) => {
    const user = await findOneUserUdao(req.body.id);
    if (user === null) {
      res.json({ success: false, message: "user Not found" });
      return;
    }
    const data = await findLikesByUser(user);
    res.json(data);
  });
};

export default LikesController;
