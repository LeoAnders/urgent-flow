const Request = require("../models/Request");

//Add request to urgent screen
const addRequest = async (req, res) => {
  let request = new Request(req.body);
  try {
    let doc = await request.save();
    res.redirect("/");
  } catch (error) {
    res.render("all");
  }
};

//loads the urgent screen
const allRequests = async (req, res) => {
  try {
    let docs = await Request.find({ finished: false }).sort({ date: 1 }); 

    const undoFilter = req.method === "POST" && req.originalUrl === "/filter";

    // Keeps collapse open after applying filter
    const keepCollapseOpen = false;

    res.render("all", {
      requests: docs,
      user: req.user.name,
      undoFilter,
      keepCollapseOpen,
    });
  } catch (error) {
    res.send(error);
  }
};

//Add request to finished screen
const addFinishedRequest = async (req, res) => {
  try {
    let id = req.params.id;
    let doc = await Request.findById(id);
    doc.finished = true;
    await doc.save();

    res.redirect("/");
  } catch (error) {
    res.status(404);
  }
};

//load finished screen
const loadFinishedRequests = async (req, res) => {
  try {
    let docs = await Request.find({ finished: true }).sort({ date: 1 }).exec();

    res.render("done", { requests: docs, user: req.user.name });
  } catch (error) {
    res.status(404);
  }
};

//deleting request from the finished screen
const deleteRequest = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    id = req.body.id;
  }
  try {
    await Request.findByIdAndDelete(id);
    res.redirect("/done");
  } catch (error) {
    res.status(404).send(error);
  }
};

// Filter request 
const inputFilter = async (req, res) => {
  const { filterStartDate, filterEndDate, filterName, filterRequestNumber } = req.body;
  try {
    const query = {};

    if (filterStartDate) {
      // Filter on a single day
      if (!filterEndDate) {
        query.date = new Date(filterStartDate);
      }
      // filter on a date range
      else {
        query.date = {
          $gte: new Date(filterStartDate),
          $lte: new Date(filterEndDate),
        };
      }
    }

    if (filterName) {
      query.name = filterName;
    }
    if (filterRequestNumber) {
      query.requestNumber = filterRequestNumber;
    }

    let docs = await Request.find(query);
    const undoFilter = req.method === "POST" && req.originalUrl === "/filter";

    // Keeps collapse open after applying filter
    const keepCollapseOpen = true;

    res.render("all", {
      requests: docs,
      user: req.user.name,
      undoFilter,
      keepCollapseOpen,
    });
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  addRequest,
  allRequests,
  loadFinishedRequests,
  addFinishedRequest,
  deleteRequest,
  inputFilter,
};
