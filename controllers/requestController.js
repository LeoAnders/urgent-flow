const Request = require("../models/Request");

const addRequest = async (req, res) => {
   let request = new Request(req.body)
  try {
    let doc = await request.save();
    res.redirect("/")
  } catch (error) {
    res.render("all");
  }
};

const allRequests = async (req, res) => {
  try{
    let docs = await Request.find( {} );
    res.render("all", { requests: docs })
  }catch(error) {
    res.send("no links found")

  }
};

module.exports = { addRequest, allRequests };
