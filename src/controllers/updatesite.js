const FrontendSchema = require('../models/frontend')

module.exports = async (req, res) => {
    try {
      await FrontendSchema.updateOne(
        { find:"find"},
        {
          $set: {
            find : req.body.find,
            sitename: req.body.sitename,
            sitedescription: req.body.sitedescription,
            whoweare: req.body.whoweare,
            whatwedo: req.body.whatwedo,
            phone: req.body.phone,
            notice: req.body.notice,
            email: req.body.email,
            address: req.body.address,
            information: req.body.info,
            logo:req.files['logo'][0].path,
            favicon : req.files['favicon'][0].path,
            links: {
              youtube: req.body.links.youtube,
              facebook: req.body.links.facebook,
              linkedin: req.body.links.linkedin,
              twitter: req.body.links.twitter,
              github: req.body.links.github,
              instagram: req.body.links.instagram
            }
          }
        }
      );
      res.send("done");
    } catch (error) {
      // Handle error appropriately, e.g., send an error response
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }