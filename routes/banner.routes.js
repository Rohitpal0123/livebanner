const express = require("express");
const router = express.Router();
const addBanner = require("../controllers/banner/add");

module.exports = (io) => {
  router.post("/add", (req, res) => {
    addBanner.process(req, res, io);
  });

  router.get("/get", require("../controllers/banner/get").process);

  return router;
};
