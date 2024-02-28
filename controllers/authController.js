const {getUserByEmail,deleteUser: crudDeleteUser} = require("../crud/crudUser");
const bcrypt = require("bcrypt");
const utilisateur = require("../models/Utilisateur");
const jwt = require('jsonwebtoken');



const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
  }
}
const verifyPassword = async (password, hashedPassword) => {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (error) {
    console.error('Error verifying password:', error);
  }
};  
const generateToken = (payload) => {
  const token = jwt.sign(payload, "sp0iowu;af655$7698yr&^%^$(Q#*sd65f", { expiresIn: '24h' }); // Token expires in 1 hour

  return token;
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user)
    return res
      .status(404)
      .json({ error: "Couldn't find a user with this email!" });

  if (!verifyPassword(password,user.password))
    return res.status(404).json({ error: "Wrong password!" });
 
  res.status(200).json({ user: user});
};

const deleteUser = async (req, res) => {

  const { deleteUserId } = req.body;

 

  await crudDeleteUser(deleteUserId);

  res.status(200).json({ message: "Success" });
};

const logout = async (req, res) => {
  const { currentUser } = req.currentUser;
  

  res.status(200).json({message:"logged out"});
};

const newAuth =  async (req, res) => {
  const { Nom, Prenom, Gener, dt_Naiss, email, password, Autorisation ,avatar } =req.body;
   
  if( !(Nom && Prenom && Gener && dt_Naiss && email && password && Autorisation && avatar) ){
    res.json({input: "notComplete"});
  }
  const hashedPassword =await hashPassword(password)
  const data = await utilisateur.create({ Nom, Prenom, Gener, dt_Naiss, email, password : hashedPassword,role: Autorisation ,avatar });
  const token = generateToken({lastName:Nom,firstName:Prenom,email,role:Autorisation});
  res.status(200).json({user:data,token});
};

module.exports = {
  
  deleteUser,
  login,
  logout,
  newAuth
};
