let db = require("../models");
var library = db.library;

exports.addLibrary = async (req, res) => {
  try {
    let postData = req.body;
    const data = await library.create(postData);
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getLibraries = async (req, res) => {
  try {
    const data = await library.findAll({order:[["updatedAt","DESC"]]});
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getLibrary = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("libraryId", id);
    const data = await library.findOne({ where: { id } });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updateLibrary = async (req, res) => {
  try {
    const updateData = req.body;
    const data = await library.update(updateData, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


exports.deleteLibrary = async (req, res) => {
  try {
    let id = req.params.id;
    let delData = await library.destroy({where:{id:id}})
    res.status(200).json({message:"Library is deleted" , res:delData})
  } catch (err) {
    return res.status(400).json({err:err.message})
}
}