let db = require("../models");
var plan = db.plan;

exports.addPlans = async (req, res) => {
  try {
    let postData = req.body;
    const data = await plan.create(postData);
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getPlans = async (req, res) => {
  try {
    const data = await plan.findAll();
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getPlan = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("planId", id);
    const data = await plan.findOne({ where: { id } });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const updateData = req.body;
    const data = await plan.update(updateData, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const id = req.params.id;
    const plans = await plan.destroy({ where: { id: id } });
    res.status(200).json({ message: "Plan is deleted", res: plans });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};