const express = require("express");
const routes = express.Router();
const validate = require("../validation/joiValidation")

const departmentsController = require("../controllers/departmentsController");

/**
 * @swagger
 * components:
 *      schema:
 *          departments:
 *                     type: object
 *                     properties:
 *                          courseId:
 *                                  type: integer
 *                          name:
 *                              type: string
 *                          head_of_department:
 *                                            type: string
 *                          number_of_students:
 *                                            type: integer
 *                          department_description:
 *                                                type: string
 */

/**
 * @swagger
 * /api/v1/addDepartment:
 *  post:
 *      summary: This API is use to add Department
 *      description: This API is used to insert data into department table
 *      tags:
 *        - Department
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schema/departments"
 *      responses:
 *          200:
 *              description: Department Added Sucessfully
 */
routes.post("/addDepartment", departmentsController.addDepartment);

/**
 * @swagger
 * /api/v1/getAllDepartments:
 *  get:
 *      summary: This API is used to get all the Departments
 *      description: This API is used to get all the Departments
 *      tags:
 *        - Department
 *      responses:
 *          200:
 *              description: These are all the Departments
 */
routes.get("/getAllDepartments", departmentsController.getDepartments);

/**
 * @swagger
 * /api/v1/getDepartment/{id}:
 *  get:
 *        summary: This API is used to get Department details with the reference of ID
 *        description: This API is used to get Department details
 *        tags:
 *          - Department
 *        parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Numeric ID is required
 *              schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: These are the details of this Department
 */
routes.get("/getDepartment/:id", departmentsController.getDepartment);

/**
 * @swagger
 * /api/v1/updateDepartment/{id}:
 *  patch:
 *        summary: This API is used to update existing Departments details
 *        description: This API is used to update existing Departments details
 *        tags:
 *          - Department
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
 *                         $ref: "#components/schema/departments"
 *        responses:
 *            200:
 *                description: Department Updated Sucessfully
 */
routes.patch("/updateDepartment/:id", validate.valid, departmentsController.updateDepartment);

/**
 * @swagger
 * /api/v1/deleteDepartment/{id}:
 *  delete:
 *      summary: This API is used to delete the Department
 *      description: This is used to delete the Department
 *      tags:
 *         - Department
 *      parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Numeric ID is required
 *              schema:
 *                type: integer
 *      responses:
 *          200:
 *              description: Department was Deleted
 */
routes.delete("/deleteDepartment/:id", departmentsController.deleteDepartment);

module.exports = routes;
