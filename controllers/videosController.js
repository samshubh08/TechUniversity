let db = require("../models");
var video = db.video;
var validate = require("../validation/joiValidation");

exports.videoUpload = (req, res) => {
  try {
    console.log("fdgdgbgf", req.file.filename, req.file);
    res.send("Video Uploaded Sucessfully");
  } catch (err) {
    console.log(err);
  }
};







// try{
//     const data ={
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         image: req.file.path
//     }
//     const sqlQuery = "insert into user set ?"
//     await connection.query(sqlQuery, data, (err, result) => {
//         if (err) {
//             return res.send({status:400, response:err.sqlMessage})
//         }
//         res.send({staus:200, response: result})
//     })
// }
// catch(err){
//     res.send({status:400, response:err.sqlMessage})
// }
