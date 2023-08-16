const express = require("express");
const routes = express.Router();
const validate = require("../validation/joiValidation")
const userVerification = require("../middleware/jwt")
const testresultController = require("../controllers/testresultController");

/**
 * @swagger
 * components:
 *      schema:
 *          test_results:
 *                      type: object
 *                      properties:
 *                          userId:
 *                              type: integer
 *                          sessionId:
 *                              type: integer
 *                          planId:
 *                              type: integer
 *                          questionId:
 *                              type: integer
 *                          answer_chosen:
 *                               type: integer
 *                          attempts:
 *                                type: string
 */

/**
 * @swagger
 * /api/v1/questionView/{id}:
 *  get:
 *      summary: This API is used to get question with reference of questionId and option attemped by a student
 *      description: This API is to get question with reference of questionId and option attemped by student
 *      tags:
 *        - Test Results
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID is required
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: This is the question and with marked option by student
 */
routes.get("/questionView/:id", testresultController.questionView);

/**
 * @swagger
 * /api/v1/userQuestionAttempt:
 *  post:
 *      summary: This API is used to post all the question attemped by a student
 *      description: This API is use to insert data in User Result Table
 *      tags:
 *        - Test Results
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schema/test_results"
 *      responses:
 *          200:
 *              description: Question Attemped by a student is saved Sucessfully
 */
routes.post("/userQuestionAttempt", userVerification.studentAuthenticate, testresultController.userQuestionAttempt);

routes.get(
  "/allQuestionsAttemptbyUser/:userId/:questionId",
  testresultController.allQuestionsAttemptbyUser
);

routes.get("/getUserAttempts/:userId", testresultController.getUserAttempts)

routes.post("/getUserRankwithTime", testresultController.getUserRankwithTime)

module.exports = routes;
