const express = require("express");
const routes = express.Router();
const validate = require("../validation/joiValidation")

const subjectsController = require("../controllers/subjectsController");

/**
 * @swagger
 * components:
 *      schema:
 *          subject:
 *                     type: object
 *                     properties:
 *                          departmentId:
 *                                      type: integer
 *                          name:
 *                              type: string
 *                          unit:
 *                              type: string
 */

/**
 * @swagger
 * /api/v1/addSubject:
 *  post:
 *      summary: This API is use to add Subject
 *      description: This API is used to insert data into Subject table
 *      tags:
 *        - Subject
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schema/subject"
 *      responses:
 *          200:
 *              description: Subject Added Sucessfully
 */
routes.post("/addSubject", subjectsController.addSubject);

/**
 * @swagger
 * /api/v1/getAllSubjects:
 *  get:
 *      summary: This API is used to get all the Subjects
 *      description: This API is used to get all the Subjects
 *      tags:
 *        - Subject
 *      responses:
 *          200:
 *              description: These are all the Subjects
 */
routes.get("/getAllSubjects", subjectsController.getSubjects);

/**
 * @swagger
 * /api/v1/getSubject/{id}:
 *  get:
 *        summary: This API is used to get Subject details with the reference of ID
 *        description: This API is used to get Subject details
 *        tags:
 *          - Subject
 *        parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Numeric ID is required
 *              schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: These are the details of this Subject
 */
routes.get("/getSubject/:id", subjectsController.getSubject);

/**
 * @swagger
 * /api/v1/updateSubject/{id}:
 *  patch:
 *        summary: This API is used to update existing Subject details
 *        description: This API is used to update existing Subject details
 *        tags:
 *          - Subject
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
 *                         $ref: "#components/schema/subject"
 *        responses:
 *            200:
 *                description: Subject Updated Sucessfully
 */
routes.patch("/updateSubject/:id", validate.valid, subjectsController.updateSubject);

/**
 * @swagger
 * /api/v1/deleteSubject/{id}:
 *  delete:
 *      summary: This API is used to delete the Subject
 *      description: This is used to delete the Subject
 *      tags:
 *         - Subject
 *      parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Numeric ID is required
 *              schema:
 *                type: integer
 *      responses:
 *          200:
 *              description: Subject was Deleted Sucessfully
 */
routes.delete("/deleteSubject/:id", subjectsController.deleteSubject);

module.exports = routes;
