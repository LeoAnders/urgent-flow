const User = require ("../models/User")

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
  const { name, username, password, password2, role } = req.body;
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
    errors.push({ msg: "A senha deve ter pelo menos 6 caracteres" });
  }

  // If there are errors, render the register page with the error messages and form values
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      username,
      password,
      password2,
    });
  } else {

    // First, check if the username already exists in the database
    try {
      let selectedUser = await User.findOne({ username: username });
      if (selectedUser) {
        errors.push({msg: "Usuário já existe"});
      }
    } catch (error) {
      res.status(500).send(error);
    }

    // If the username is not found, create a new user
    let user = new User({
      name: name,
      username: username,
      password: password,
      password2: password2,
      role: role,
    });

    try {
      let savedUser = await user.save();
      res.send(savedUser);
    } catch (error) {
      res.status(400).send(error);
    }
  }
};

module.exports = {
  userLogin,
  userRegister,
  registerHandle
}