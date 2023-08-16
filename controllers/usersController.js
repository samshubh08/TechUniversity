let db = require("../models");
let user = db.user;
const { sign } = require("jsonwebtoken");
const { hash, compare, genSalt } = require("bcrypt");

exports.registerUser = async (req, res) => {
  try {
    const { first_name, last_name, gender, email, password, role } = req.body;
    if (role == "1") { res.send({ status: 400, Error: "Can't be Admin" }) }
    const salt = await genSalt(8);
    const hashPassword = await hash(password, salt);
    console.log("first", password, "second", hashPassword);
    let data = {
      first_name,
      last_name,
      gender,
      email,
      password: hashPassword,
      role,
    };
    const userRegister = await user.create(data);
    res.send({ status: 201, response: userRegister });
  } catch (err) {
    return res.send({ status: 400, Error: err.message });
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const { first_name, last_name, gender, email, password } = req.body;
    const salt = await genSalt(8);
    const hashPassword = await hash(password, salt);
    console.log("first", password, "second", hashPassword);
    let data = {
      first_name,
      last_name,
      gender,
      email,
      password: hashPassword,
      role: 1,
    };
    const adminRegister = await user.create(data);
    res.send({ status: 201, response: adminRegister });
  } catch (err) {
    return res.send({ status: 400, Error: err.message });
  }
};

exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("gsdfas", email);

    if (!email) {
      const err = new Error();
      err.statusCode = 401;
      err.message = "Email is required";
      throw err;
    }
    let users = await user.findOne({ where: { email } });
    if (!users) {
      const err = new Error();
      err.statusCode = 401;
      err.message = "User Not Found";
      throw err;
    }
    const checkPassword = await compare(password, users.dataValues.password);
    if (!checkPassword) {
      const err = new Error();
      err.statusCode = 401;
      err.message = "Login ID & Password is Incorrect";
      throw err;
    }
    console.log("first", users.dataValues.role);
    if (users.dataValues.role !== 1) {
      const err = new Error();
      err.statusCode = 401;
      err.message = "User Not Verified";
      throw err;
    }
    const token = await sign({ id: users.dataValues.id }, "This is Mosphe.");
    console.log("token", token);
    return res.send({ status: 200, users, token });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      const err = new Error();
      err.statusCode = 401;
      err.message = "Email is required";
      throw err;
    }
    let users = await user.findOne({ where: { email } });
    if (!users) {
      const err = new Error();
      err.statusCode = 401;
      err.message = "User Not Found";
      throw err;
    }
    const checkPassword = await compare(password, users.dataValues.password);
    if (!checkPassword) {
      const err = new Error();
      err.statusCode = 401;
      err.message = "Login ID & Password is Incorrect";
      throw err;
    }
    if (users.dataValues.role === 1) {
      const err = new Error();
      err.statusCode = 401;
      err.message = "User Not Verified";
      throw err;
    }
    const token = await sign(
      { id: users.dataValues.id },
      process.env.JWT_SECRET
    );
    const data = await user.update(
      { token }, {where: { id: users.dataValues.id }});
    let userDetail = await user.findOne({ where: { email } });
    return res.send({ status: 200, users: userDetail, token });
  } catch (err) {
    next(err);
  }
};

// exports.getAdmin = async (req, res) => {
//   try {
//   const data = await user.findAll({ where: { role: "1" } });
//   res.status(200).json({ data: data });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

exports.getProfessor = async (req, res) => {
  try {
    const data = await user.findAll({ where: { role: "2" } });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const data = await user.findAll({ where: { role: "3" } });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const allUsers = await user.findAll();
    res.json({ status: 200, data: allUsers });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    // const { id } = req.params;
    // console.log("userId", id);
    const data = await user.findOne({ where: { id :req.user.id } });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.patchUser = async (req, res) => {
  try {
    const updatedData = req.body;
    const data = await user.update(updatedData, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// exports.deleteUser = async (req, res) => {
//   try {
//     let id = req.params.id;
//     let user = await user.destroy({ where: { id:id } });
//     res.status(200).send("User is deleted.");
//   } catch (err) {
//     console.log("Error:", err);
//   }
// };


/**
 * Get User  171
 */