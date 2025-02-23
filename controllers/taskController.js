import mongoose from "mongoose"
import Task from "../models/taskModel.js"
export const createTask = (async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

})

export const getTasks = (async (req, res) => {
    try {
        const task = await Task.find({})

        if (!task) {
            res.status(404).json({ msg: 'No tasks to display' })
        } else {
            res.status(200).json(task)
        }

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

export const getTaskbyID = (async (req, res) => {
    try {

        const task = await Task.findById(req.params.id)

        if (!task) {
            res.status(404).json({ msg: 'task not found' })
        } else {
            res.status(200).json(task)
        }

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

export const updateTask = (async (req, res) => {
    try {

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body)
        if (!updateTask) {
            res.status(404).json({ msg: 'task not found' })
        } else {
            res.send('task sucessfully updated')
            res.status(200).json(updatedTask)
        }

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

export const deleteTask = (async (req, res) => {
    try {

        const task = await Task.findById(req.params.id)
        if (!task) {
            res.status(404).json({ msg: 'task not found' })
        }

        const deletedTask = await Task.findByIdAndDelete(req.params.id)
        if (deletedTask) {
            res.status(200).send('deleted task successfully')
        }

    } catch (error) {
        res.status(500).json({ msg: error.message })

    }

})

