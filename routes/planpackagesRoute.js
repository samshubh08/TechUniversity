const express = require("express");
const routes = express.Router();
const validate = require("../validation/joiValidation")

const plansPackageController = require("../controllers/planpackagesController");

/**
 * @swagger
 * components:
 *      schema:
 *          plan_packages:
 *                     type: object
 *                     properties:
 *                          price:
 *                              type: string
 *                          duration:
 *                                 type: string
 *                          isActive:
 *                                 type: string
 *                          status:
 *                               type: string
 *                          planId:
 *                               type: integer
 */

/**
 * @swagger
 * /api/v1/addPlanPackage:
 *  post:
 *      summary: This API is use to add Plan Package
 *      description: This API is used to insert data into Plan Package table
 *      tags:
 *        - Plan Package
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schema/plan_packages"
 *      responses:
 *          200:
 *              description: Plan Package Added Sucessfully
 */
routes.post("/addPlanPackage", plansPackageController.addPlanPackage);

/**
 * @swagger
 * /api/v1/getAllPlanPackages:
 *  get:
 *      summary: This API is used to get all the Plan Package
 *      description: This API is used to get all the Plan Package
 *      tags:
 *        - Plan Package
 *      responses:
 *          200:
 *              description: These are all the Plan Packages
 */
routes.get("/getAllPlanPackages", plansPackageController.getAllPlanPackages);

/**
 * @swagger
 * /api/v1/getPlanPackage/{id}:
 *  get:
 *        summary: This API is used to get Plan Package details with the reference of ID
 *        description: This API is used to get Plan Package details
 *        tags:
 *         - Plan Package
 *        parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Numeric ID is required
 *              schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: These are the details of this Plan Package
 */
routes.get("/getPlanPackage/:id", plansPackageController.getPlanPackage);

/**
 * @swagger
 * /api/v1/updatePlanPackage/{id}:
 *  patch:
 *        summary: This API is used to update existing Plan Package details
 *        description: This API is used to update existing Plan Package details
 *        tags:
 *         - Plan Package
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
 *                         $ref: "#components/schema/plan_packages"
 *        responses:
 *            200:
 *                description: Plan Package Updated Sucessfully
 */
routes.patch(
  "/updatePlanPackage/:id", validate.valid, 
  plansPackageController.updatePlanPackage
);


/**
 * @swagger
 * /api/v1/deletePlanPackage/{id}:
 *  delete:
 *      summary: This API is used to delete the Plan Package
 *      description: This is used to delete the Plan Package
 *      tags:
 *          - Plan Package
 *      parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Numeric ID is required
 *              schema:
 *                type: integer
 *      responses:
 *          200:
 *              description: Plan Package was Deleted Sucessfully
 */
routes.delete("/deletePlanPackage/:id", plansPackageController.deletePlanPackage)

module.exports = routes;
