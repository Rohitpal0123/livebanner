const Banner = require("../../models/banner.model");

class addBanner {
  process = async (req, res, io) => {
    try {
      // Extract banner details from the request body
      const { description, endTime, link, visibility } = req.body;

      // First check if there is any banner already exists or not
      let banner = await Banner.findOne();

      // If not, then create a new banner
      if (!banner) {
        banner = await Banner.create({
          description,
          endTime,
          link,
          visibility,
        });
      }
      // If a banner already exists, then update the existing banner
      else {
        banner.description = description;
        banner.endTime = endTime;
        banner.link = link;
        banner.visibility = visibility;
        await banner.save();
      }

      if (!banner) throw new Error("Banner not created or updated");

      // Emit the updated or created banner to all connected WebSocket clients
      io.emit("bannerUpdate", banner);

      // Send the updated or created banner as a response to the HTTP request
      res.status(200).json(banner);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).send({ error: error.message });
    }
  };
}

module.exports = new addBanner();
