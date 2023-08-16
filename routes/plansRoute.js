const express = require("express");
const routes = express.Router();
const validate = require("../validation/joiValidation")

const plansController = require("../controllers/plansController");

/**
 * @swagger
 * components:
 *      schema:
 *          plans:
 *               type: object
 *               properties:
 *                       name:
 *                           type: string
 *                       description:
 *                                  type: string
 */

/**
 * @swagger
 * /api/v1/addPlans:
 *  post:
 *      summary: This API is use to add Plans
 *      description: This API is used to insert data into Plans table
 *      tags:
 *        - Plans
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schema/plans"
 *      responses:
 *          200:
 *              description: Plan Added Sucessfully
 */
routes.post("/addPlans", plansController.addPlans);

/**
 * @swagger
 * /api/v1/getAllPlans:
 *  get:
 *      summary: This API is used to get all the Plans
 *      description: This API is used to get all the Plans
 *      tags:
 *        - Plans
 *      responses:
 *          200:
 *              description: These are all the Plans
 */
routes.get("/getAllPlans", plansController.getPlans);

/**
 * @swagger
 * /api/v1/getPlan/{id}:
 *  get:
 *        summary: This API is used to get Plan details with the reference of ID
 *        description: This API is used to get Plan details
 *        tags:
 *          - Plans
 *        parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Numeric ID is required
 *              schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: These are the details of this Plan
 */
routes.get("/getPlan/:id", plansController.getPlan);

/**
 * @swagger
 * /api/v1/updatePlan/{id}:
 *  patch:
 *        summary: This API is used to update existing Plan details
 *        description: This API is used to update existing Plan details
 *        tags:
 *          - Plans
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
 *                         $ref: "#components/schema/plans"
 *        responses:
 *            200:
 *                description: Plan Updated Sucessfully
 */
routes.patch("/updatePlan/:id", validate.valid, plansController.updatePlan);

/**
 * @swagger
 * /api/v1/deletePlan/{id}:
 *  delete:
 *      summary: This API is used to delete the Plan
 *      description: This is used to delete the Plan
 *      tags:
 *          - Plans
 *      parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Numeric ID is required
 *              schema:
 *                type: integer
 *      responses:
 *          200:
 *              description: Plan was Deleted Sucessfully
 */
routes.delete("/deletePlan/:id", plansController.deletePlan);

module.exports = routes;
