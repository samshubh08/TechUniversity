const jwt = require("jsonwebtoken");
const db = require("../models/index");
const users = db.user;

exports.adminAuthenticate = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) return res.json({ status: 400, message: "No Authorization Token is Send with Request" })
    const id = await jwt.verify(token, "This is Technology");
    console.log("first", id);
    const user = await users.findOne({ where: { userId: id.id } });
    if (!user) {
      res.json({ status: 400, Error: "Not a Admin" });
    }
    if (user.role === 1) {
      req.user = user;
      return next();
    }
    return res.json({ status: 400, response: "Not a Admin" });
  } catch (err) {
    res.json({ status: 400, Error: err.message });
  }
};

exports.professorAuthenticate = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      return res.json({
        status: 400,
        message: "No Authorization Token is Send with Request",
      });
    }
    const id = await jwt.verify(token, "This is Technology");
    console.log("first", id);
    const user = await users.findOne({ where: { userId: id.id } });
    if (!user) {
      res.json({ status: 400, Error: "Not a Professor" });
    }
    if (user.role === 2) {
      req.user = user;
      return next();
    }
    return res.json({ status: 400, response: "Not a Professor" });
  } catch (err) {
    res.json({ status: 400, Error: err.message });
  }
};

exports.studentAuthenticate = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      return res.json({
        status: 400,
        message: "No Authorization Token is Send with Request",
      });
    }
    const id = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("first", id);
    const user = await users.findOne({ where: { id: id.id } });
    if (!user) {
      res.json({ status: 400, Error: "Not a Student" });
    }
    if (user.token !== token) {
      return res.json({ status: 400, Error: "Error please login again" });
    }
    if (user.role === 3) {
      req.user = user;
      return next();
    }
    return res.json({ status: 400, response: "Not a Student" });
  } catch (err) {
    res.json({ status: 400, Error: err.message });
  }
};
