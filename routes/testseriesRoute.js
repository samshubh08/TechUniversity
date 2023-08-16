const express = require("express");
const routes = express.Router();
const upload = require("../folderUpload");
let customMulter = upload.single("question_name");

const testSeriesController = require("../controllers/testseriesController");

/**
 * @swagger
 * components:
 *      schema:
 *          test_series:
 *                     type: object
 *                     properties:
 *                          courseId:
 *                                 type: integer
 *                          subjectId:
 *                                  type: integer
 *                          question:
 *                              type: string
 *                          option_1:
 *                                 type: string
 *                          option_2:
 *                                 type: string
 *                          option_3:
 *                                 type: string
 *                          option_4:
 *                                 type: string
 *                          correct_option:
 *                                        type: string
 *                          description:
 *                                     type: string
 *                          file:
 *                              type: file
 */

/**
 * @swagger
 * /api/v1/addTestseries:
 *  post:
 *      summary: This API is use to add Test Series
 *      description: This API is used to insert data into Test Series table
 *      tags:
 *        - Test Series
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: "#components/schema/test_series"
 *      responses:
 *          200:
 *              description: Test Series Added Sucessfully
 */
routes.post(
  "/addTestseries",
  (req, res, next) => {
    if (req.body && Object.keys(req.body).length === 0) {
      customMulter = upload.single("question_name");
    } else {
      customMulter = upload.none();
    }
    next();
  },
  customMulter,
  testSeriesController.addTestseries
);

/**
 * @swagger
 * /api/v1/getAllCourseTestSeries/{courseId}:
 *  get:
 *      summary: This API is used to get all the Test Series with respect to Course
 *      description: This API is used to get all the Test Series with respect to Course
 *      tags:
 *        - Test Series
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID is required
 *            schema:
 *                type: integer
 *      responses:
 *          200:
 *              description: These are all the Test Series with respect to Course
 */
routes.get(
  "/getAllCourseTestSeries/:courseId",
  testSeriesController.getAllCourseTestSeries
);

/**
 * @swagger
 * /api/v1/getAllSubjectTestseries/{subjectId}:
 *  get:
 *      summary: This API is used to get all the Test Series with respect to Subject
 *      description: This API is used to get all the Test Series with respect to Subject
 *      tags:
 *        - Test Series
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID is required
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: These are all the Test Series with respect to Subject
 */
routes.get(
  "/getAllSubjectTestSeries/:subjectId",
  testSeriesController.getAllSubjectTestSeries
);

/**
 * @swagger
 * /api/v1/getTestseries/{id}:
 *  get:
 *        summary: This API is used to get Test Series details with the reference of ID
 *        description: This API is used to get Test Series details
 *        tags:
 *          - Test Series
 *        parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Numeric ID is required
 *              schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: These are the details of this Test Series
 */
routes.get("/getTestseries/:id", testSeriesController.getTestseries);

/**
 * @swagger
 * /api/v1/updateTestseries/{id}:
 *  patch:
 *        summary: This API is used to update existing Test Series details
 *        description: This API is used to update existing Test Series details
 *        tags:
 *          - Test Series
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
 *                         $ref: "#components/schema/test_series"
 *        responses:
 *            200:
 *                description: Test Series Updated Sucessfully
 */
routes.patch("/updateTestseries/:id", testSeriesController.updateTestseries);

routes.post("/chooseOption/:questionId", testSeriesController.chooseOption);

module.exports = routes;
