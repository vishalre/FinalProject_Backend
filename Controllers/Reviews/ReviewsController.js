import {findAllReviewsRdao, findReviewsByUserdao} from "../../DAO/reviewDao.js";
import authenticate from "../../Middleware/authenticate.js";
import {findOneUserUdao} from "../../DAO/UserDao.js";
const findAllReviewsMethod = async (req, res) => {
  const reviews = await findAllReviewsRdao();
  res.json(reviews);
};
const ReviewsController = (app) => {
  app.get("/api/reviews", findAllReviewsMethod);

  app.post("/api/find-reviews", authenticate, async (req, res) => {
    const user = await findOneUserUdao(req.body.id);
    if (user === null) {
      res.json({ success: false, message: "user Not found" });
      return;
    }
    const data = await findReviewsByUserdao(user);
    res.json(data);
  });
};
export default ReviewsController;
