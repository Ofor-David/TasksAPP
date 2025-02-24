import mongoose from "mongoose"
import Task from "../models/taskModel.js"
import User from "../models/userModel.js"
export const createTask = (async (req, res) => {
    try {
        const task = await Task.create({ text: req.body.text, user: req.user.id })
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

})

export const getTasks = (async (req, res) => {
    try {
        const task = await Task.find({ user: req.user.id })

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
        const user = await User.findById(req.user.id)
        const task = await Task.findById(req.params.id)
        if (!user) {
            res.status(404).json({ msg: 'user not found' })
        }
        if (!task) {
            res.status(404).json({ msg: 'task not found' })
        }
        if (user.id !== task.user.toString()) {
            res.status(403).json({ msg: 'unauthorized' })
        } else {
            res.status(200).json(task)
        }

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

export const updateTask = (async (req, res) => {

    try {
        const user = await User.findById(req.user.id)
        const task = await Task.findById(req.params.id)

        if (!user) {
            res.status(404).json({ msg: 'user not found' })
        }
        if (!task) {
            res.status(404).json({ msg: 'task not found' })
        }

        if (task.user.toString() !== user.id) {
            res.status(403).json({ msg: 'unauthorized' })
        } else {
            const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body)
            res.status(200).json(updatedTask)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }



})

export const deleteTask = (async (req, res) => {
    try {

        const task = await Task.findById(req.params.id)
        const user = await User.findById(req.user.id)
        if (!task) {
            res.status(404).json({ msg: 'task not found' })
        }
        if (!user) {
            res.status(404).json({ msg: 'user not found' })
        }
        if (user.id !== task.user.toString()) {
            res.status(403).json({ msg: 'unauthorized' })
        }
        const deletedTask = await Task.findByIdAndDelete(req.params.id)
        if (deletedTask) {
            res.status(200).send('deleted task successfully')
        }

    } catch (error) {
        res.status(500).json({ msg: error.message })

    }

})

