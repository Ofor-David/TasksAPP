import express from 'express'
import { createTask, getTasks, getTaskbyID, updateTask, deleteTask } from '../controllers/taskController.js'
const taskRoute = express.Router()

taskRoute.post('/', createTask)
taskRoute.get('/:id', getTaskbyID)
taskRoute.get('/', getTasks)
taskRoute.put('/:id', updateTask)
taskRoute.delete('/:id', deleteTask)
export default taskRoute