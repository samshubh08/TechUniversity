const express = require("express");
const routes = express.Router();
const validate = require("../validation/joiValidation")

const coursesController = require("../controllers/coursesController");

/**
 * @swagger
 * components:
 *      schema:
 *          courses:
 *                     type: object
 *                     properties:
 *                          planId:
 *                                type: integer
 *                          name:
 *                              type: string
 *                          starts_from:
 *                                     type: string
 *                          course_duration:
 *                                         type: string
 *                          course_price:
 *                                      type: string
 *                          course_incharge:
 *                                         type: string
 *                          department:
 *                                    type: string
 *                          year:
 *                              type: string
 *                          course_description:
 *                                            type: string
 */

/**
 * @swagger
 * /api/v1/addCourse:
 *  post:
 *      summary: This API is use to add Course
 *      description: This API is used to insert data into Course table
 *      tags:
 *        - Courses
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schema/courses"
 *      responses:
 *          200:
 *              description: Course Added Sucessfully
 */
routes.post("/addCourse", coursesController.addCourse);

/**
 * @swagger
 * /api/v1/getAllCourses:
 *  get:
 *      summary: This API is used to get all the Courses
 *      description: This API is used to get all the Courses
 *      tags:
 *        - Courses
 *      responses:
 *          200:
 *              description: These are all the Courses
 */
routes.get("/getAllCourses", coursesController.getCourses);

/**
 * @swagger
 * /api/v1/getCourse/{id}:
 *  get:
 *        summary: This API is used to get Course details with the reference of ID
 *        description: This API is used to get Course details
 *        tags:
 *          - Courses
 *        parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Numeric ID is required
 *              schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: These are the details of this Course
 */
routes.get("/getCourse/:id", coursesController.getCourse);

/**
 * @swagger
 * /api/v1/updateCourse/{id}:
 *  patch:
 *        summary: This API is used to update existing Course details
 *        description: This API is used to update existing Course details
 *        tags:
 *          - Courses
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
 *                         $ref: "#components/schema/courses"
 *        responses:
 *            200:
 *                description: Course Updated Sucessfully
 */
routes.patch("/updateCourse/:id", validate.valid, coursesController.updateCourse);

/**
 * @swagger
 * /api/v1/deleteCourse/{id}:
 *  delete:
 *      summary: This API is used to delete the Course
 *      description: This is used to delete the Course
 *      tags:
 *          - Courses
 *      parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Numeric ID is required
 *              schema:
 *                type: integer
 *      responses:
 *          200:
 *              description: Course was Deleted Sucessfully
 */
routes.delete("/deleteCourse/:id", coursesController.deleteCourse);

module.exports = routes;
