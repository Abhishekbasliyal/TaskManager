const Task = require('../models/task')

// const allTasks = async (req,res)=>{
//     // res.send('all items')
//    try{
//     const task = await Task.find()
//     res.status(200).json({task})
//    }catch(err){
//         res.status(500).json({message: err})
//    }

// }
const allTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ tasks });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};


const createTask = async (req,res)=>{
    try{
        const task = await Task.create(req.body)
        res.status(201).json({task})
    }catch(err){
        res.status(500).json({message: err})
    }
}
const getTask = async(req,res)=>{
    try{
        const {id: taskID} = req.params;
        console.log(taskID)
        const task = await Task.findOne({_id: taskID})
        if(!task){
            return  res.status(404).json({msg: `No task with id ${taskID}`})
            
        }
        res.status(200).json({task})
    }catch(error){
        res.status(500).json({msg: error})
    }
}
const updateTask = async (req,res)=>{
        try{
            const {id: taskID} = req.params
            const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
                new:true,
                runValidators:true
            })

            if(!task){
                return res.status(404).json(`cannot find the task with id ${taskID}`)
            }
            res.status(200).json({id:taskID, name:req.body})
        }catch(err){
            res.status(500).json({task})
        }
}
const deleteTask = async (req,res)=>{
   try{
    const {id: taskID}=  req.params
    console.log(taskID)
    const task = await Task.deleteOne({_id : taskID})
    
    if(!task){
     return res.status(404).json(`No task with id ${taskID}`)
    }
    res.status(200).json(`task with task id ${taskID} deleted successfully`)
   }catch(err){
        res.status(500).json({msg: err})
   }
}
module.exports = {
    allTasks,createTask,getTask, deleteTask,updateTask
}