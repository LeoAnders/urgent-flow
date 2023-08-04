const Request = require("../models/Request");

//Add request to urgent screen
const addRequest = async (req, res) => {
   let request = new Request(req.body)
  try {
    let doc = await request.save();
    res.redirect("/")
  } catch (error) {
    res.render("all");
  }
};

//loads the urgent screen 
const allRequests = async (req, res) => {
  try{
    let docs = await Request.find( {} );
    res.render("all", { requests: docs, user: req.user.name });
  }catch(error) {
    res.send("no links found")
  }
};

//load finished screen
const loadFinishedRequests = async (req,res) =>{
  try{
    let docs = await Request.find({ finished: true })
    res.render("done", {requests:docs, user: req.user.name}) 
  }catch(error){
    res.status(404)
  }
}

//Add request to finished screen
const addFinishedRequest = async (req, res) => {
  try {
    let id = req.params.id;
    let doc = await Request.findById(id);
    doc.finished = true;
    await doc.save();

    let updateRequests = await Request.find({finished: false })
    res.render("all", {requests: updateRequests, user: req.user.name })
  } catch (error) {
    res.status(404);
  }
};

//deleting request from the finished screen
const deleteRequest = async (req, res) => {
  let id = req.params.id
  if(!id){
    id = req.body.id
  }
  try{
    await Request.findByIdAndDelete(id)
    res.redirect("/done")
  }catch(error){
    res.status(404).send(error)
  }
}

//filter requests by current date
const filterCurrentDay = async (req, res) => {
  try{
    let docs = await Request.find({finished: false}).sort({date: 1});
    res.render("all", { requests: docs })
  }catch(error) {
    res.status(500).send(error)
  }
}

//filter by most recent completed request
const latestFiltering = async (req, res) => {
  try{
    let docs = await Request.find({finished: true}).sort({date: 1}).exec();
    res.render("done", { requests: docs, user: req.user.name  })
  }catch(error) {
    res.status(500).send(error)
  }
}

module.exports = { 
  addRequest,
  allRequests,
  loadFinishedRequests,
  addFinishedRequest,
  deleteRequest,
  filterCurrentDay,
  latestFiltering,
};
