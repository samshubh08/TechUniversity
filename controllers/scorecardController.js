let db = require("../models");
let { sequelize } = require("../models");
var score_card = db.score_card;
var validate = require("../validation/joiValidation");
const { Op } = require("sequelize");

exports.addscore = async (req, res) => {
  try {
    const { userId, planId, attempts, questionId, test_result, description } = req.body;
    console.log("question ID", questionId.length);
    const scoreData = {
      userId,
      planId,
      test_seriesId: `${questionId}`,
      score: test_result,
      attempts: questionId.length,
      test_result,
      description: "",
    };
    console.log("Score Data", scoreData);
    const data = await score_card.create(scoreData);
    res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updatescore = async (req, res) => {
  try {
    const { id } = req.params;
    const { attempts, test_result, description } = req.body;
    const oldScore = await score_card.findOne({ where: { id } });
    let score = test_result + oldScore.dataValues.score;
    const scoreData = { attempts, test_result, description, score };
    const data = await score_card.update(scoreData, { where: { id } });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getUserScore = async (req, res) => {
  try {
    const data = await score_card.findAll({
      attributes: [
        "userId",
        "planId",
        [sequelize.fn("sum", sequelize.col("score")), "total_Score"],
      ],
      order: [["updatedAt", "DESC"]],
      group: ["userId"],
    });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// rank according to the plan and userId ,and score
exports.getUserScoreByUserId = async (req, res) => {
  try {
    const { userId, planId } = req.params;
    const data = await score_card.findAll({
      attributes: ["userId", "planId", "score"],
      where: {
        [Op.and]: [{ userId }, { planId }],
      },
    });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getUserRankByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    // const data = await score_card.findAll({ order: [["updatedAt", "DESC"]] });
    const data = await score_card.findAll({
      attributes: [
        "userId",
        // "planId",
        "score",
        [
          sequelize.literal(
            "RANK() OVER (ORDER BY score DESC, updatedAt DESC)"
          ),
          "rank",
        ],
      ],
      group: ["userId"],
    });
    // order: [["score", "DESC"]];
    // });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

/**
 * exports.addscore = async (req, res) => {
  try {
    const { userId, planId, attempts, questionId, test_result, description } =
      req.body;
    console.log("question ID", questionId.length);

    // if (questionId.length < 0 || questionId.length >= 5) {
    //   return res.status(400).json({ message: "Question Length not allowed " });
    // }
    // let totalScore = 1;
    // let a = await questionId.map(async (data) => {
    //   let countResult = await test_result_db.findAll({
    //     where: {
    //       [Op.and]: [{ userId }, { planId }, { questionId: data }],
    //     },
    // });
    // if (countResult.answer_chosen == countResult.correct_option) {
    //   totalScore = totalScore + 1;
    //   console.log("totalScore", totalScore);
    // }
    // });
    // console.log("A", a);
    
    const scoreData = {
      userId,
      planId,
      test_seriesId: `${questionId}`,
      score: test_result,
      attempts: questionId.length,
      test_result,
      description: "",
    };
    console.log("Score Data", scoreData);
    const data = await score_card.create(scoreData);
    res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
 */
