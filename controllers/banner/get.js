const Banner = require("../../models/banner.model");

class getBanner {
  process = async (req, res) => {
    try {
        console.log("Hit1")
      const getBanner = await Banner.findOne();
      if (!getBanner) throw new Error("Banner not found");

      res.status(200).send(getBanner);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).send(error);
    }
  };
}

module.exports = new getBanner();
