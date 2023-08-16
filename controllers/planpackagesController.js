let db = require("../models");
var plan_package = db.plan_package;
var validate = require("../validation/joiValidation");

exports.addPlanPackage = async (req, res) => {
  try {
    let postData = req.body;
    const data = await plan_package.create(postData);
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getAllPlanPackages = async (req, res) => {
  try {
    const data = await plan_package.findAll({ order: [["updatedAt", "DESC"]] });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getPlanPackage = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("planPackageId", id);
    const data = await plan_package.findOne({ where: { id } });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updatePlanPackage = async (req, res) => {
  try {
    const updateData = req.body;
    const data = await plan_package.update(updateData, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


exports.deletePlanPackage = async (req, res) => {
  try {
    const id = req.params.id;
    const planPackage = await plan_package.destroy({ where: { id:id } });
    res.status(200).json({message:"Plan Package is deleted" , res:planPackage});
  } catch (err) {
    return res.status(400).json({err:err.message})
  }
};