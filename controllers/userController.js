
const userLogin = async (req, res)=>{
  try {
    res.send("login");

  }catch(error) {
    res.status(400).send(error)
  }
}

const userRegister = async (req, res)=>{
  try {
    res.send("Register")
    
  }catch(error) {
    res.status(400).send(error)
  }

}

module.exports = {
  userLogin,
  userRegister
  
}