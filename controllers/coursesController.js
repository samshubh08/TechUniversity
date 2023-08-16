let db = require("../models");
var course = db.course;
var validate = require("../validation/joiValidation");

exports.addCourse = (validate, async (req, res) => {
  try {
    let postData = req.body;
    const data = await course.create(postData);
    res.status(200).json({ data: data });     
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});
// ashish

exports.getCourses = async (req, res) => {
  try {
    const data = await course.findAll({
      include: {
        model: db.plan,
        as: 'plan'
      },
      order:[["updatedAt","DESC"]]
    });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("courseId", id);
    const data = await course.findOne({ where: { id } });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const updateData = req.body;
    const data = await course.update(updateData, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const courses = await course.destroy({ where: { id:id } });
    res.status(200).json({message:"Course is deleted" , res:courses});
  } catch (err) {
    return res.status(400).json({err:err.message})
  }
};
