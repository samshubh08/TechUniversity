let db = require("../models");
var question_bank = db.question_bank;
const xlsx = require("xlsx");
var validate = require("../validation/joiValidation");

////////// Post API for inserting a data from excel sheet to database//////////

exports.addQuestionBank = async (req, res) => {
  try {
    const question = [];
    let filename = "";
    if (req.file) {
      filename = `../src/questions/${req.file.filename}`;

      let workbook = xlsx.readFile(filename);
      let worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let range = xlsx.utils.decode_range(worksheet["!ref"]);

      const data1 = [];
      for (let row = range.s.r; row <= range.e.r; row++) {
        let data = [];

        for (let col = range.s.c; col <= range.e.c; col++) {
          let cell = worksheet[xlsx.utils.encode_cell({ r: row, c: col })];
          console.log("first", cell.v);
          data.push(cell.v);
        }
        data1.push(data);
      }
      data1.forEach((element) => {
        const obj = {
          question: element[0],
          answer: element[1],
          subjectId: element[2],
        };
        question.push(obj);
      });
    }
    console.log(req.body, 38);
    if (req.body && Object.keys(req.body).length > 0) {
      const obj = {
        subjectId: req.body.subjectId,
        question: req.body.question,
        answer: req.body.answer,
      };
      question.push(obj);
    }
    console.log(question);
    // let postData = req.body;
    // const data2 = await library.create(postData);
    const data = await question_bank.bulkCreate(question);
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getAllQuestionBanks = async (req, res) => {
  try {
    const data = await question_bank.findAll({
      include: {
        model: db.subject,
        as: "subject",
      },
      order: [["updatedAt", "DESC"]],
    });
    const questionCount = await question_bank.count()
    res.status(200).json({ data: data, totalQuestion:questionCount });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getQuestionBank = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("questionBankId", id);
    const data = await question_bank.findOne({ where: { id } });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getQuebySubject = async (req, res) => {
  try {
    const data = await question_bank.findAll({
      where: {
        subjectId: req.params.subjectId,
      },
    });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updateQuestionBank = async (req, res) => {
  try {
    const updateData = req.body;
    const data = await question_bank.update(updateData, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
