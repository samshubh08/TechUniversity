const express = require("express");
const routes = express.Router();

const rolesController = require("../controllers/rolesController");

routes.post("/addrole", rolesController.addRole);

module.exports = routes;
