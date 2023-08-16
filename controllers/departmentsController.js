let db = require("../models");
var department = db.department;
var validate = require("../validation/joiValidation");

exports.addDepartment = (validate, async (req, res) => {
  try {
    let postData = req.body;
    const data = await department.create(postData);
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});
// "as"

exports.getDepartments = async (req, res) => {
  try {
    const data = await department.findAll({
      include: {
        model: db.course,
        as: "course",
      },
      order: [["updatedAt", "DESC"]],
    });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("departmentId", id);
    const data = await department.findOne({ where: { id } });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const updatedData = req.body;
    const data = await department.update(updatedData, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    let id = req.params.id;
    let departments = await department.destroy({ where: { id: id } });
    res
      .status(200)
      .json({ message: "Department is deleted", res: departments });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};
