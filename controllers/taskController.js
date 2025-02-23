export const createTask = ((req, res) => {
    res.status(200).json({ msg: "create task" })
})

export const getTasks = ((req, res) => {
    res.status(200).json({ msg: "get tasks" })
})

export const getTaskbyID = ((req, res) => {
    res.status(200).json({ msg: "get task by id" })
})

export const updateTask = ((req, res) => {
    res.status(200).json({ msg: "update task" })
})

export const deleteTask = ((req, res) => {
    res.status(200).json({ msg: "delete task" })
})

