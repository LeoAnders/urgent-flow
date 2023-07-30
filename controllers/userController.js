const User = require ("../models/User")
const bcrypt = require ("bcryptjs")

//loads login screen
const userLogin = async (req, res)=>{
  try {
    res.render("login");

  }catch(error) {
    res.status(400).send(error)
  }
}

//load registration screen
const userRegister = async (req, res)=>{
  try {
    res.render("register")
    
  }catch(error) {
    res.status(400).send(error)
  }

}

// register handle
const registerHandle = async (req, res) => {
  const { name, username, password, password2, role, admin } = req.body;
  const errors = [];

  // Check required fields
  if (!name || !username || !password || !password2 || !role) {
    errors.push({ msg: "Por favor, preencha todos os campos" });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: "As senhas não coincidem" });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: "Senha requer, no mínimo, 6 caracteres." });
  }

  // If there are errors, render the register page with the error messages and form values
  if (errors.length > 0) {
    return res.render("register", {
      errors,
      name,
      username,
      password,
      password2,
    });
    
  } 


  // Check if the username already exists in the database
  let selectedUser = await User.findOne({ username: username});
  if (selectedUser) {
    errors.push({ msg: "Usuário já existe" });
    return res.render("register", {
      errors,
      name,
      username,
      password,
      password2,
    });
  }

  // If the username is not found and there are no other errors, create a new user
  let user = new User({
    name: name,
    username: username,
    password: bcrypt.hashSync(password),
    password2: password2,
    role: role,
    admin: admin === "on",
  });

    try{
      let savedUser = await user.save()
      res.render("register")
    }catch(error) {
      res.status(400).send(error)
    }
};

const loginHandle = async (req, res) =>{

  const { username, password } = req.body;
  
 try{
  let selectedUser = await User.findOne({ username: username })
  if(!selectedUser) return res.status(400).send("User incorrect")

  let passwordAndUserMatch = bcrypt.compareSync(password, selectedUser.password)
  if(!passwordAndUserMatch) return res.status(400).send("password incorrect")

  res.redirect("/")

  }catch(error) {
    res.send(error)
  };

};

module.exports = {
  userLogin,
  userRegister,
  registerHandle,
  loginHandle
}