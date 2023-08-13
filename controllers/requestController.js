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
      role: req.user.role,
      admin: req.user.admin,      
      undoFilter,
      keepCollapseOpen,
    });
  } catch (error) {
     res.status(404).send(error);
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

    res.render("done", { 
      requests: docs, 
      user: req.user.name,
      role: req.user.role,
      admin: req.user.admin,    
    });
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
      role: req.user.role,
      admin: req.user.admin,
      undoFilter,
      keepCollapseOpen,
    });
  } catch (error) {
    res.send(error);
  }
};

// Load page edit
const loadEdit = async (req, res) => {

  let id = req.params.id;
  try {
      let doc = await Request.findById(id)
      res.render('edit', { error: false, body: doc })
  } catch (error) {
      res.status(404).send(error);
  }
}

// Edit request
const editRequest = async (req, res) => {

  const {name, representative, requestNumber, date, shipping, description} = req.body

  const request = {}
  request.name = name
  request.representative = representative
  request.requestNumber = requestNumber
  request.date = date
  request.shipping = shipping
  request.description =description

  let requestId = req.params.id;
if (!requestId) {
    requestId = req.body.id;
}

  
  try {

    await Request.updateOne({ _id: requestId }, request)

    req.flash("success_msg", "Pedido editado com sucesso")
    res.redirect('/')
    

  } catch(error){
    res.status(500).send('Erro ao editar pedido');
  }

  
}

// Restore request 
const restoreRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Request.findById(id);
    
    doc.finished = false;
    await doc.save();

    req.flash("success_msg", "Pedido restaurado com sucesso")
    res.redirect("/done")
  
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao restaurar o pedido");
  }
};

module.exports = {
  addRequest,
  allRequests,
  loadFinishedRequests,
  addFinishedRequest,
  deleteRequest,
  inputFilter,
  loadEdit,
  editRequest,
  restoreRequest,
};
