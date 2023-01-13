const User = require("../Models/userSchema");
const bcrypt = require("bcrypt");
const saltRounds = 15;

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user)
    return res.status(409).send({ message: "User already exists", status: 409 });
  try {
    if (password === "") throw new Error();
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ ...req.body, password: hashedPassword });
    const user = await newUser.save();
    req.session.uid = user._id;
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error + "Could not create user" });
  }
};

exports.login = async (req, res) => {
  console.log('logging in')
  try {
    const { email } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email: email });
    if (user) {
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (valid) {
        req.session.uid = user._id;
        
        res.status(200).send({ status: 200 });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ error: error, message: "Email and/or password incorrect" });
  }
};

exports.logout = async (req, res) => {
  
  req.session.destroy((error) => {
    if (error) {
      
      res.status(500).send(error + "Could not log out please try again");
    } else {
      res.clearCookie("sid");
      console.log('cookie cleared')
      res.status(200).send({message:"Logout succesful"});
    }
  });
};

exports.getUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    console.log(allUsers);
    res.send(allUsers);
    res.status(200);
  } catch (error) {
    console.log("hello ", error);
  }
};
