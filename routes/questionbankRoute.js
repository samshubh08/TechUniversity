const express = require("express");
const routes = express.Router();
const upload = require("../folderUpload");
let customMulter = upload.single("question_name");

const questionBankController = require("../controllers/questionbankController");

/**
 * @swagger
 * components:
 *      schema:
 *          question_bank:
 *                     type: object
 *                     properties:
 *                          subjectId:
 *                                   type: integer
 *                          question:
 *                                 type: string
 *                          answer:
 *                               type: string
 *                          file:
 *                              type: file
 */

/**
 * @swagger
 * /api/v1/addQuestionBank:
 *  post:
 *      summary: This API is use to add Question Bank
 *      description: This API is used to insert data into Question Bank table
 *      tags:
 *        - Question Bank
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: "#components/schema/question_bank"
 *      responses:
 *          200:
 *              description: Question Bank Added Sucessfully
 */
routes.post(
  "/addQuestionBank",
  (req, res, next) => {
    if (req.body && Object.keys(req.body).length === 0) {
      customMulter = upload.single("question_name");
    } else {
      customMulter = upload.none();
    }
    next();
  },
  customMulter,
  questionBankController.addQuestionBank
);

/**
 * @swagger
 * /api/v1/getAllQuestionBanks:
 *  get:
 *      summary: This API is used to get all the Question Bank
 *      description: This API is used to get all the Question Bank
 *      tags:
 *        - Question Bank
 *      responses:
 *          200:
 *              description: These are all the Question Banks
 */
routes.get("/getAllQuestionBanks", questionBankController.getAllQuestionBanks);

/**
 * @swagger
 * /api/v1/getQuestionBank/{id}:
 *  get:
 *        summary: This API is used to get Question Bank details with the reference of ID
 *        description: This API is used to get Question Bank details
 *        tags:
 *         - Question Bank
 *        parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Numeric ID is required
 *              schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: These are the details of this Question Bank
 */
routes.get("/getQuestionBank/:id", questionBankController.getQuestionBank);

/**
 * @swagger
 * /api/v1/getQuebySubject/{subjectId}:
 *  get:
 *        summary: This API is used to get Questions with the reference of SubjectId
 *        description: This API is used to get Questions with the reference of SubjectId
 *        tags:
 *         - Question Bank
 *        parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Numeric ID is required
 *              schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: These are the details of this Subject and their Question
 */
routes.get(
  "/getQuebySubject/:subjectId",
  questionBankController.getQuebySubject
);

/**
 * @swagger
 * /api/v1/updateQuestionBank/{id}:
 *  patch:
 *        summary: This API is used to update existing Question Bank details
 *        description: This API is used to update existing Question Bank details
 *        tags:
 *         - Question Bank
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
 *                         $ref: "#components/schema/question_bank"
 *        responses:
 *            200:
 *                description: Question Bank Updated Sucessfully
 */
routes.patch(
  "/updateQuestionBank/:id",
  questionBankController.updateQuestionBank
);

module.exports = routes;
