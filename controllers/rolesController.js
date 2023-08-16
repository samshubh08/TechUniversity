var db = require("../models");

exports.addRole = async (req, res) => {
  try {
    console.log(req.body);
    let {name} = req.body;
    const data = await db.role.create( {name} );
    res.status(200).json({ data: data });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

