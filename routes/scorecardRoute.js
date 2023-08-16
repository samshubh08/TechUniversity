const express = require("express");
const routes = express.Router();
const validate = require("../validation/joiValidation")

const scorecardController = require("../controllers/scorecardController");

/**
 * @swagger
 * components:
 *      schema:
 *          score_card:
 *                  type: object
 *                  properties:
 *                      userId: 
 *                          type: integer
 *                      planId:
 *                          type: integer
 *                      questionId:
 *                              type: integer
 *                      test_result:
 *                              type: string
 *                      attempts: 
 *                              type: string
 */

/**
 * @swagger
 * /api/v1/addscore:
 *  post:
 *      summary: This API is use to generate the Score of the user
 *      description: This API is used to generate Score of the user
 *      tags:
 *         - Score
 *      requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schema/score_card"
 *      responses:
 *          200:
 *                  description: This is the score of the user
 */
routes.post("/addscore", scorecardController.addscore);

routes.patch("/updatescore/:id", scorecardController.updatescore);

routes.get("/getUserScore", scorecardController.getUserScore);

routes.get("/getUserScoreByUserId/:userId/:planId", scorecardController.getUserScoreByUserId)

routes.get("/getUserRankByUserId", scorecardController.getUserRankByUserId)

module.exports = routes;
