let db = require("../models");
var user = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createTransport } = require("nodemailer");

////POST API FOR FORGET PASSWORD/////
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const data = await user.findOne({ where: { email } });
    if (data == null) {
      return res.json({ status: 400, response: "User Not Registered" });
    }
    const secret = process.env.JWT_SECRET + data.password;
    const payload = {
      email: data.email,
      id: data.id,
    };
    //User exist now create a one time password link valid for 15 minutes
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    // const link = `${process.env.Frontend_Url}reset-password/?userid=${data.id}&token=${token}`;
    const link = `${process.env.Frontend_Url}reset-password/${data.id}/${token}`;

    mailOption = {
      to: email,
      subject: "Forget Password link",
      html: link,
      from: process.env.User_Email,
    };
    const setup = await createTransport({
      service: "gmail",
      auth: {
        user: process.env.User_Email,
        pass: process.env.User_Password,
      },
    });

    await setup.sendMail(mailOption, (error, info) => {
      if (error) {
        console.log({ Error: error.message });
      }
      console.log(`Email sent: ${info}`);
      res.send("Password reset link has been send to your Registered Email...");
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

////GET API FOR RESET PASSWORD/////
exports.resetPassword = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    if (!id || !token) {
      return res.send({ status: 401, response: "Missing Parameter" });
    }
    const { password, confirmPassword } = req.body;
    const userData = await user.findOne({ where: { id } });
    if (!userData) {
      return res.send({ status: 401, response: "Missing Parameter" });
    }
    const secret = process.env.JWT_SECRET + userData.password;
    const verify = await jwt.verify(token, secret);
    // console.log("verify", verify);
    if (!verify) {
      return res.send({ status: 401, response: "!!! oops Link is Expired" });
    }
    if (
      !password ||
      password == "" ||
      confirmPassword == "" ||
      !confirmPassword
    ) {
      return res.send({ status: 401, response: "Missing Parameter" });
    }
    if (password !== confirmPassword) {
      return res.send({
        status: 401,
        response: "Password doesn't match with Confirm Password",
      });
    }
    let comparePassword = await bcrypt.compare(password, userData.password);

    if (comparePassword) {
      return res.send({
        status: 401,
        response: "Password Can't be same as old password",
      });
    }
    const salt = await bcrypt.genSalt(8);
    let hashPassword = await bcrypt.hash(password, salt);
    ////////////////////////////////
    await user.update({ password: hashPassword }, { where: { id } });
    res.send({
      status: 200,
      response: "Password Updated Successfully",
    });
  } catch (err) {
    return res.send({ status: 400, response: err.message });
  }
};
