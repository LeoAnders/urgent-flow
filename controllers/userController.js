
const userLogin = async (req, res)=>{
  try {
    res.render("login");

  }catch(error) {
    res.status(400).send(error)
  }
}

const userRegister = async (req, res)=>{
  try {
    res.render("register")
    
  }catch(error) {
    res.status(400).send(error)
  }

}

module.exports = {
  userLogin,
  userRegister
  
}