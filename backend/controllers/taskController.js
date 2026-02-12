
const { Task } = require("../models");

exports.createTask = async (req,res)=>{
  const task = await Task.create({
    title:req.body.title,
    status:req.body.status,
    UserId:req.user.id
  });
  res.json(task);
};

exports.getTasks = async (req,res)=>{
  const tasks = await Task.findAll({where:{UserId:req.user.id}});
  res.json(tasks);
};

exports.updateTask = async (req,res)=>{
  await Task.update(req.body,{where:{id:req.params.id}});
  res.json({message:"Updated"});
};

exports.deleteTask = async (req,res)=>{
  await Task.destroy({where:{id:req.params.id}});
  res.json({message:"Deleted"});
};
