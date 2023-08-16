const express = require("express");
const routes = express.Router();
const validate = require("../validation/joiValidation")

const librariesController = require("../controllers/librariesController");

/**
 * @swagger
 * components:
 *      schema:
 *          libraries:
 *                     type: object
 *                     properties:
 *                          title:
 *                               type: string
 *                          subject:
 *                                 type: string
 *                          author:
 *                                type: string
 *                          department:
 *                                    type: string
 *                          status:
 *                                type: string
 *                          type:
 *                              type: string
 *                          year:
 *                              type: string
 */

/**
 * @swagger
 * /api/v1/addLibrary:
 *  post:
 *      summary: This API is use to add Library
 *      description: This API is used to insert data into Library table
 *      tags:
 *        - Library
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schema/libraries"
 *      responses:
 *          200:
 *              description: Library Added Sucessfully
 */
routes.post("/addLibrary", validate.valid, librariesController.addLibrary);

/**
 * @swagger
 * /api/v1/getAllLibraries:
 *  get:
 *      summary: This API is used to get all the Libraries
 *      description: This API is used to get all the Libraries
 *      tags:
 *        - Library
 *      responses:
 *          200:
 *              description: These are all the Libraries
 */
routes.get("/getAllLibraries", librariesController.getLibraries);

/**
 * @swagger
 * /api/v1/getLibrary/{id}:
 *  get:
 *        summary: This API is used to get Library details with the reference of ID
 *        description: This API is used to get Library details
 *        tags:
 *          - Library
 *        parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Numeric ID is required
 *              schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: These are the details of this Library
 */
routes.get("/getLibrary/:id", librariesController.getLibrary);

/**
 * @swagger
 * /api/v1/updateLibrary/{id}:
 *  patch:
 *        summary: This API is used to update existing Library details
 *        description: This API is used to update existing Library details
 *        tags:
 *          - Library
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
 *                         $ref: "#components/schema/libraries"
 *        responses:
 *            200:
 *                description: Library Updated Sucessfully
 */
routes.patch("/updateLibrary/:id", validate.valid, librariesController.updateLibrary);

/**
 * @swagger
 * /api/v1/deleteLibrary/{id}:
 *  delete:
 *      summary: This API is used to delete the Library
 *      description: This is used to delete the Library
 *      tags:
 *         - Library
 *      parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Numeric ID is required
 *              schema:
 *                type: integer
 *      responses:
 *          200:
 *              description: Library was Deleted Sucessfully
 */
routes.delete("/deleteLibrary/:id", librariesController.deleteLibrary);

module.exports = routes;
