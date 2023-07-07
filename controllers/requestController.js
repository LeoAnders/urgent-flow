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

const loadFinishedRequests = async (req,res) =>{
  try{
    let docs = await Request.find({ finished: true })
    res.render("done", {requests:docs}) 
  }catch(error){
    res.status(404)
  }
}

const addFinishedRequest = async (req, res) => {
  try {
    let id = req.params.id;
    let doc = await Request.findById(id);
    doc.finished = true;
    await doc.save();

    let updateRequests = await Request.find({finished: false })
    res.render("all", {requests: updateRequests})
  } catch (error) {
    res.status(404);
  }
};


module.exports = { addRequest, allRequests, loadFinishedRequests, addFinishedRequest };
