let db = require("../models");
var subject = db.subject;
var validate = require("../validation/joiValidation");

exports.addSubject = async (req, res) => {
  try {
    let postData = req.body;
    const data = await subject.create(postData);
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getSubjects = async (req, res) => {
  try {
    const data = await subject.findAll({
      include: {
        model: db.department,
        as: 'department'
      },
      order:[["updatedAt","DESC"]]
    });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getSubject = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("subjectId", id);
    const data = await subject.findOne({ where: { id } });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const updateData = req.body;
    const data = await subject.update(updateData, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    let id = req.params.id;
    let delData = await subject.destroy({where:{id:id}})
    res.status(200).json({message:"Subject is deleted" , res:delData})
  } catch (err) {
    return res.status(400).json({err:err.message})
  }
}
