let db = require("../models");
let test_series = db.test_series;
const xlsx = require("xlsx");
var validate = require("../validation/joiValidation");

////////// Post API for inserting a data from excel sheet to database//////////

exports.addTestseries = async (req, res) => {
  try {
    const questions = [];
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
          option_1: element[1],
          option_2: element[2],
          option_3: element[3],
          option_4: element[4],
          correct_option: element[5],
          subjectId: element[6],
          courseId: element[7],
          // description: element[8]
        };
        questions.push(obj);
      });
    }
    console.log(req.body);
    if (req.body && Object.keys(req.body).length > 0) {
      const {
        subjectId,
        question,
        option_1,
        option_2,
        option_3,
        option_4,
        courseId,
        correct_option,
        // description
      } = req.body;

      if (
        !subjectId ||
        !question ||
        !option_1 ||
        !option_2 ||
        !option_3 ||
        !option_4 ||
        !courseId ||
        !correct_option
      ) {
        return res.status(400).json({ Error: "All fields are mandatory" });
      }
      const obj = {
        subjectId,
        question,
        option_1,
        option_2,
        option_3,
        option_4,
        courseId,
        correct_option,
        // description
      };
      questions.push(obj);
    }
    console.log(questions);
    const data = await test_series.bulkCreate(questions);
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getAllCourseTestSeries = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId) {
      return res.status(400).json({ error: "Course Id is required" });
    }
    const data = await test_series.findAll({
      where: { courseId },
      include: {
        model: db.course,
        as: "course",
      },
      order: [["updatedAt", "DESC"]],
      // offset: 5,
      // limit: 5,
    });
    if (!data) {
      return res.status(400).json({ error: "Course is not present" });
    }
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getAllSubjectTestSeries = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const data = await test_series.findAll({
      where: { subjectId },
      include: {
        model: db.subject,
        as: "subject",
      },
      // order: [["updatedAt", "DESC"]],
    });
    // const questionCount = await question_bank.count()
    res.status(200).json({ data: data }); /// , totalQuestion:questionCount ///
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getTestseries = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("testseriesId", id);
    const data = await test_series.findOne({ where: { id } });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updateTestseries = async (req, res) => {
  try {
    const updateData = req.body;
    const data = await test_series.update(updateData, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.chooseOption = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { selectedOption } = req.body;
    const data = await test_series.findOne({ where: { id: questionId } });
    console.log("first", data.dataValues.correct_option);
    console.log("req", req.body);

    if (data.dataValues.correct_option == selectedOption) {
      return res.status(200).json({ message: " Correct", data });
    }
    res.status(200).json({ message: "Incorrect", data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
