const express = require('express')
const router = express.Router()
const {createTask,deleteTask,getTask,allTasks,updateTask} = require('../conrollers/tasks')

router.route('/').get(allTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router