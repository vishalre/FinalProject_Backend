import {
  createAddressAdao,
  findOneAddressAdao,
  removeUserAdao,
  updateUserAdao,
} from "../../DAO/AddressDao.js";
import {
  createPaymentsPdao,
  findOnePaymentsPdao,
  removeUserPdao,
  updateUserPdao,
} from "../../DAO/PaymentDao.js";
import {
  addAddressUdao,
  addReviewUdao,
  addPaymentUdao,
  deleteUserUdao,
  findAllUsersUdao,
  findOneUserUdao,
  removeAddressUdao,
  removePaymentUdao,
  removeReviewUdao,
  addLikeUdao,
  removeLikeUdao, findUserProfileUdao,
} from "../../DAO/UserDao.js";
import {
  updateReviewPdao,
  removeReviewPdao,
  createProductPdao,
  updateLikePdao,
  removeLikePdao,
  findOneProductPdao, findProductByASINdao,
} from "../../DAO/ProductsDao.js";
import {
  CreateReviewRdao,
  findOneReviewsRdao,
  deleteReviewsRdao,
} from "../../DAO/reviewDao.js";
import {
  createLikeLdao,
  removeLikeLdao,
  findOneLikeLdao, findLikesByUser,
} from "../../DAO/LikesDao.js";
import auth from "../../Middleware/authController.js";
import authenticate from "../../Middleware/authenticate.js";
import mongoose from "mongoose";

const uniqueEmailCheck = (req, res) => {
  users.find({ email: req.body.email }, (err, user) => {
    if (err) res.json({ success: false, message: { uniqueEmail: false, err } });
    else {
      if (user.length !== 0)
        res.json({ success: false, message: { uniqueEmail: false, err: {} } });
      else res.json({ success: true, message: { uniqueEmail: true, err: {} } });
    }
  });
};

const UsersController = (app) => {

  //Login method defined in AuthCOntroller checks if the provided UserName and Password match
  app.post("/api/login", auth.login);
  //checks if a given username is already in the DataBase
  app.post("/api/uniqueEmail", uniqueEmailCheck);
  //Defined in AuthController adds a user
  app.post("/api/users", auth.UserRegistration);
  //Defined in Auth Controller updates a user
  app.put("/api/updateusers", auth.UserDataUpdate);
  // gets all the Users
  app.post("/api/all-users", authenticate, async (req, res) => {
    const user = await findOneUserUdao(req.body.id);
    if (user.type === "Admin") {
      const allUsers = await (
        await findAllUsersUdao()
      ).filter((data) => data.type != "Admin");
      res.json({ success: true, allUsers });
      return;
    }
    res.json({ success: false, allUsers: {} });
  });

  // has to have a by feild and type of by should be admin
  app.post("/api/remove-users", authenticate, async (req, res) => {
    const user = await findOneUserUdao(req.body.id);
    if (user.type === "Admin") {
      const status = await deleteUserUdao(req.body.delId);
      res.json({ success: true, status });
      return;
    }
    res.json({ success: false, status: {} });
  });

  //extracts the user by Id for lookingup users when not logged in
  app.get("/api/users/:id", async (req, res) => {
    const user = await findUserProfileUdao(req.params["id"]);
    if (user == null) {
      res.json({ error: "No User Found with this ID", user });
      return;
    }
    res.json({
      error: "",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        reviews: user.reviews,
        dateOfBirth: user.dateOfBirth,
        email: user.email,
        phone: user.phone,
        type: user.type,
      },
    });
  });

  //extracts the user by Id for lookingup users when  logged in
  app.post("/api/logged-user/", authenticate, async (req, res) => {
    const user = await findOneUserUdao(req.body.id);
    if (user == null) {
      res.json({ error: "No User Found with this ID", user });
      return;
    }
    res.json({
      error: "",
      user,
    });
  });

  //adds address to a user
  app.put("/api/add-address/", authenticate, async (req, res) => {
    let address = await findOneAddressAdao(req.body.address);
    if (address == null) {
      address = await createAddressAdao(req.body.address);
    }
    const addAddress = await updateUserAdao(address._id, req.body.uid);
    const user = await addAddressUdao(req.body.uid, address._id);
    if (user.n <= 0) {
      res.json({ error: "No User Found with this ID", user });
      return;
    }
    res.json({
      error: "",
      user,
    });
  });
  //remove address
  app.put("/api/remove-address/", authenticate, async (req, res) => {
    const addAddress = await removeUserAdao(req.body.aid, req.body.uid);
    const user = await removeAddressUdao(req.body.uid, req.body.aid);
    if (user.n <= 0) {
      res.json({ error: "No User Found with this ID", user });
      return;
    }
    res.json({
      error: "",
      user,
    });
  });

  //adds Card to a user
  app.put("/api/add-payment/", authenticate, async (req, res) => {
    let payment = await findOnePaymentsPdao(req.body.payment);
    if (payment == null) {
      payment = await createPaymentsPdao(req.body.payment);
    }
    const addPayment = await updateUserPdao(payment._id, req.body.uid);
    const user = await addPaymentUdao(req.body.uid, payment._id);
    if (user.n <= 0) {
      res.json({ error: "No User Found with this ID", user });
      return;
    }
    res.json({
      error: "",
      user,
    });
  });
  //remove Payment
  app.put("/api/remove-payment/", authenticate, async (req, res) => {
    const removeAddress = await removeUserPdao(req.body.pid, req.body.uid);
    const user = await removePaymentUdao(req.body.uid, req.body.pid);
    if (user.n <= 0) {
      res.json({ error: "No User Found with this ID", user });
      return;
    }
    res.json({
      error: "",
      user,
    });
  });

  //Reviews Backend
  app.post("/api/add-review", authenticate, async (req, res) => {
    const user = await findOneUserUdao(req.body.id);
    if (user === null) {
      res.json({ success: false, message: "user Not found" });
      return;
    }
    let productObjectId = req.body.pid;
    if (!mongoose.Types.ObjectId.isValid(productObjectId)) {
      // Fetch object id
      productObjectId = await findProductByASINdao(req.body.pid);
      productObjectId = productObjectId._id;
    }
    if (productObjectId == null){
      res.json({ success: false, message: "No product found" });
      return;
    }
    const data = await CreateReviewRdao(req.body.review,
                                        req.body.rating,
                                        req.body.id,
                                        productObjectId);
    await addReviewUdao(req.body.id, data._id);
    await updateReviewPdao(data.product, data._id);
    res.json({ success: true, message: "record created" });
  });

  //Reviews Remove  Backend
  app.post("/api/remove-review", authenticate, async (req, res) => {
    const user = await findOneUserUdao(req.body.id);
    if (user === null) {
      res.json({ success: false, message: "user Not found" });
      return;
    }
    const data = await findOneReviewsRdao(user._id, req.body.rid);
    if (data === null){
      res.json({ success: false, message: "No review found for the user" });
      return;
    }
    await removeReviewUdao(data.user, req.body.rid);
    await removeReviewPdao(data.product, req.body.rid);
    await deleteReviewsRdao(req.body.rid);
    await res.json({ success: true, message: "record removed" });
  });

  //Likes Backend
  app.post("/api/add-like", authenticate, async (req, res) => {
    const user = await findOneUserUdao(req.body.id);
    if (user === null) {
      res.json({ success: false, message: "user Not found" });
      return;
    }
    let productObjectId = req.body.productId;
    if (!mongoose.Types.ObjectId.isValid(productObjectId)) {
      // Fetch object id
      productObjectId = await findProductByASINdao(req.body.productId);
      productObjectId = productObjectId._id;
    }
    if (productObjectId == null){
      res.json({ success: false, message: "No product found" });
      return;
    }
    const data = await createLikeLdao(req.body.id, productObjectId);
    await addLikeUdao(req.body.id, data._id);
    await updateLikePdao(data.product, data._id);
    res.json({ success: true, message: "Like created" });
  });

  //Dislikes Backend
  app.post("/api/remove-like", authenticate, async (req, res) => {
    const user = await findOneUserUdao(req.body.id);
    if (user === null) {
      res.json({ success: false, message: "user Not found" });
      return;
    }
    let productObjectId = req.body.productId;
    if (!mongoose.Types.ObjectId.isValid(productObjectId)) {
      // Fetch object id
      productObjectId = await findProductByASINdao(req.body.productId);
      productObjectId = productObjectId._id;
    }
    const data = await findOneLikeLdao(req.body.id, productObjectId);
    await removeLikeLdao(req.body.id, productObjectId);
    await removeLikeUdao(req.body.id, data._id);
    await removeLikePdao(data.product, data._id);
    res.json({ success: true, message: "Like Removed" });
  });

  //liked Backend
  app.post("/api/liked", authenticate, async (req, res) => {
    const user = await findOneUserUdao(req.body.id);
    if (user === null) {
      res.json({ success: false, message: "user Not found" });
      return;
    }
    let productObjectId = req.body.productId;
    if (!mongoose.Types.ObjectId.isValid(productObjectId)) {
      // Fetch object id
      res.json({ success: false, message: "Product not present" });
      return;
    }
    const data = await findOneProductPdao(productObjectId);
    const out = data.likes.filter((e) => e.users == req.body.id);
    res.json({ success: true, liked: out.length > 0 });
  });

  //Testing purpose to add products ****
  app.post("/api/prod-add", async (req, res) => {
    await createProductPdao(req.body);
    res.sendStatus(200);
  });
};
export default UsersController;
