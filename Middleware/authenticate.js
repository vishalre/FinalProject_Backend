import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "3HD71q2k");
    req.userTimes = decode;
    next();
  } catch (err) {
    res.json({ success: false, message: "Authentication Failed" });
  }
};
export default authenticate;
