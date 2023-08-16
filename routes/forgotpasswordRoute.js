const express = require("express");
const routes = express.Router();
// const validate = require("../validation/joiValidation");

const forgotpasswordController = require("../controllers/forgotpasswordController");

/**
 * @swagger
 * components:
 *      schema:
 *          User:
 *              type: object
 *              properties:
 *                      email:
 *                          type: string
 *          Users:
 *              type: object
 *              properties:
 *                      password:
 *                              type: string
 *                      confirmPassword:
 *                                      type: string
 */

/**
 * @swagger
 * /api/v1/forget-password:
 *  post:
 *      summary: This API is used to get a One Time Password reset link on registered user Email
 *      description: This API is to send OTP Link to email
 *      tags:
 *        -  Forget Password
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schema/User"
 *      responses:
 *          200:
 *              description: Password reset link has been send to your Email Sucessfully
 */
routes.post("/forget-password", forgotpasswordController.forgotPassword);

/**
 * @swagger
 * /api/v1/reset-Password/{id}/{token}:
 *  post:
 *      summary: This API is use to reset password of a user
 *      description: This API will help you to reset password of a user
 *      tags:
 *         - Forget Password
 *      parameters:
 *          - in: path
 *            name: id
 *            require: true
 *            description: Numeric ID is required
 *            schema:
 *              type: integer
 *          - in: path
 *            name: token
 *            require: true
 *            description: Token is required
 *            schema:
 *              type: string
 *            allowReserved: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schema/Users"
 *      responses:
 *          200:
 *              description: Password Updated Successfully
 */
routes.post(
  "/reset-Password/:id/:token",
  forgotpasswordController.resetPassword
);

module.exports = routes;
