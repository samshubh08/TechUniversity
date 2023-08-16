require("dotenv").config({ path: "./.env" });
const express = require("express");
const routes = require("./routes");
const Sequelize = require("sequelize");
const cors = require("cors");
const app = express();

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const PORT = parseInt(process.env.PORT) || 5555;

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API End Point's for University",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5555/",
      },
      {
        url: "http://192.168.1.63:5555/",
      },
    ],
  },
  apis: [
    "./routes/usersRoute.js",
    "./routes/departmentsRoute.js",
    "./routes/coursesRoute.js",
    "./routes/librariesRoute.js",
    "./routes/plansRoute.js",
    "./routes/planpackagesRoute.js",
    "./routes/testseriesRoute.js",
    "./routes/subjectsRoute.js",
    "./routes/videosRoute.js",
    "./routes/testresultRoute.js",
    "./routes/forgotpasswordRoute.js",
    "./routes/scorecardRoute.js",
    "./routes/paymentRoute.js"
  ],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", routes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || "INTERNAL_SERVER_ERROR";
  const { data } = error;
  res.status(status).json({ success: false, message, data });
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database is Connected");
  })
  .catch((err) => {});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));