const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  `postgres://default:5KHAsgInZ0Et@ep-shy-boat-a27y4buz.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require`
);

sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to PostgreSQL has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the PostgreSQL database:", err);
  });

module.exports = sequelize;
