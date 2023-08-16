let db = require("../models");
let { sequelize } = require("../models");
const { Op } = require("sequelize");
var validate = require("../validation/joiValidation");
var test_result = db.test_result;
var test_series = db.test_series;
var score_cards = db.score_card;

exports.questionView = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("questionId", id);
    const data = await test_result.findOne({ where: { id } });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.userQuestionAttempt = async (req, res) => {
  try {
    let postData = req.body;
    const testSeriesData = await test_series.findOne({
      where: { id: postData.questionId },
    });
    console.log("req.body", postData, "user data", testSeriesData);
    const newData = {
      ...postData,
      correct_option: testSeriesData.dataValues.correct_option,
      userId:req.user.id
      
    };
    if (newData.correct_option == postData.answer_chosen) {
      const data = await test_result.create(newData);
      return res
        .status(200)
        .json({ data: data, response: "Option is Correct" });
    }
    const data = await test_result.create(newData);
    res.status(200).json({ data: data, response: "Option is InCorrect" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


// we need to add the attempt of the test series (which attempt the user is giving) in database

exports.allQuestionsAttemptbyUser = async (req, res) => {
  try {
    const { userId, questionId } = req.params;
    // console.log("questionId", id)
    const data = await test_result.findAll({
      where: {
        [Op.and]: [{ userId }, { questionId }],
      },
    });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

///////Attempts and questionId reference with userId/////////
exports.getUserAttempts = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await test_result.findAll({
      attributes: ["questionId", "attempts", "userId"],
      where: { userId },
    });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

///////LIKE OPERATOR///////
exports.getUserRankwithTime = async (req, res) => {
  try {
    const { startingTime, endingTime } = req.body;
    const data = await test_result.findAll({
      // attributes: {
      includes: [
        {
          attributes: ['score'],
          as: "score",
          model: "score_card",
          // [sequelize.literal("RANK() OVER (ORDER BY score DESC)"), "rank"],
        },
      ],
      // },
      // where: {
      //   sessionId: {
      //     [Op.between]: [startingTime, endingTime],
      //   },
      // },
      // group: ["userId"],
    });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// const event = await Event.findOne({
//   where: {
//     startTime: {
//       [Op.like]: `%${timeString}%`
//     }
//   }
// });

// exports.questionsAttemptbyUser = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     // console.log("questionId", id)
//     const data = await test_result.findAll({
//       where: {
//         [Op.and]: [{ userId }],
//       },
//     });
//     res.status(200).json({ data: data });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
