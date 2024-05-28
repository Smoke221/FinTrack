const express = require("express");
const { getMonthlyReport } = require("../controllers/reportController");

const rRouter = express.Router();

rRouter.get("/monthly", getMonthlyReport);

module.exports = { rRouter };
