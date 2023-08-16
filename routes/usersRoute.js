const express = require("express");
const routes = express.Router();
const validate = require("../validation/joiValidation")
const userVerification = require("../middleware/jwt");
const usersController = require("../controllers/usersController");

/**
 * @swagger
 * components:
 *      schema:
 *          users:
 *                     type: object
 *                     properties:
 *                          first_name:
 *                                    type: string
 *                          last_name:
 *                                   type: string
 *                          gender:
 *                                type: string
 *                          email:
 *                               type: string
 *                          password:
 *                                  type: string
 *                          role:
 *                              type: integer
 *          user:
 *              type: object
 *              properties:
 *                  first_name:
 *                            type: string
 *                  last_name:
 *                           type: string
 *                  d_o_b:
 *                       type: string
 *                  gender:
 *                        type: string
 *                  department:
 *                            type: string
 *                  contact:
 *                          type: string
 *                  full_address:
 *                              type: string
 *                  city:
 *                      type: string
 *                  state:
 *                       type: string
 *                  country:
 *                         type: string
 *          userlogin:
 *                   type: object
 *                   properties:
 *                       email:
 *                            type: string
 *                       password:
 *                               type: string
 */

/**
 * @swagger
 * /api/v1/registerUser:
 *  post:
 *      summary: This API is use to register Professor & Student
 *      description: This API is used to register Professor & Student
 *      tags:
 *        - Register Professor & Student
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schema/users"
 *      responses:
 *          200:
 *              description: User Registered Sucessfully
 */
routes.post("/registerUser", usersController.registerUser);

/**
 * @swagger
 * /api/v1/registerAdmin:
 *  post:
 *      summary: This API is use to register Admin
 *      description: This API is used to register Admin
 *      tags:
 *        - Register Admin
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schema/users"
 *      responses:
 *          200:
 *              description: Admin Registered Sucessfully
 */
routes.post("/registerAdmin", usersController.registerAdmin);

/**
 * @swagger
 * /api/v1/loginUser:
 *  post:
 *      summary: This API is use to login a user
 *      description: This API is used to login the user
 *      tags:
 *        - Login
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schema/userlogin"
 *      responses:
 *          200:
 *              description: Login Sucessfully
 */
routes.post("/loginUser", usersController.loginUser);

/**
 * @swagger
 * /api/v1/login-admin:
 *  post:
 *      summary: This API is use to login a Admin
 *      description: This API is used to login the Admin
 *      tags:
 *        - Login
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schema/userlogin"
 *      responses:
 *          200:
 *              description: Admin Login Sucessfully
 */
routes.post("/login-admin", usersController.loginAdmin);

// routes.get("/getAllAdmin", usersController.getAdmin);

/**
 * @swagger
 * /api/v1/getAllProfessors:
 *  get:
 *      summary: This API is used to get all the Professors
 *      description: This API is used to get all the Professors
 *      tags:
 *        - All Professors
 *      responses:
 *          200:
 *              description: These are all the Professors
 */
routes.get("/getAllProfessors", userVerification.adminAuthenticate, usersController.getProfessor);

/**
 * @swagger
 * /api/v1/getAllStudents:
 *  get:
 *      summary: This API is used to get all the Students
 *      description: This API is used to get all the Students
 *      tags:
 *        - All Students
 *      responses:
 *          200:
 *              description: These are all the Students
 */
routes.get("/getAllStudents", usersController.getStudents);

/**
 * @swagger
 * /api/v1/allUsers:
 *  get:
 *      summary: This API is used to get all the Users
 *      description: This API is used to get all the Users
 *      tags:
 *        - Users
 *      responses:
 *          200:
 *              description: These are all the Users
 */
routes.get("/allUsers", usersController.getUsers);

/**
 * @swagger
 * /api/v1/user/{id}:
 *  get:
 *        summary: This API is used to get User details with the reference of ID
 *        description: This API is used to get User details
 *        tags:
 *          - Users
 *        parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Numeric ID is required
 *              schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: These are the details of this User
 */
routes.get("/user", userVerification.studentAuthenticate, usersController.getUser);

/**
 * @swagger
 * /api/v1/user/{id}:
 *  patch:
 *        summary: This API is used to update existing User details
 *        description: This API is used to update existing User details
 *        tags:
 *          - Users
 *        parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Numeric ID is required
 *              schema:
 *                type: integer
 *        requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: "#components/schema/user"
 *        responses:
 *            200:
 *                description: User Updated Sucessfully
 */
routes.patch("/user/:id", validate.valid, usersController.patchUser);

routes.get("/all-user", userVerification.adminAuthenticate, usersController.getUsers);


module.exports = routes;
