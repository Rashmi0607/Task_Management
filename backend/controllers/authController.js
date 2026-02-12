
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.register = async (req,res)=>{
  const {name,email,password} = req.body;
  const hashed = await bcrypt.hash(password,10);
  const user = await User.create({name,email,password:hashed});
  res.json(user);
};

exports.login = async (req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({where:{email}});
  if(!user) return res.status(400).json({message:"User not found"});

  const match = await bcrypt.compare(password,user.password);
  if(!match) return res.status(400).json({message:"Invalid credentials"});

  const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"1d"});
  res.json({token});
};
