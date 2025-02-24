import express from "express";
import jwt from "jsonwebtoken"
import User from "../models/userModel.js";

const authMiddleware = (async (req, res, next) => {

    let token;
    //check for token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            if (decoded) {
                req.user = await User.findById(decoded.id).select('-password')
                next()
            } else {
                res.status(404).json({ msg: 'NOT AUTHORIZED' })
            }

        } catch (error) {
            res.status(400).json({msg:'unauthorized: invalid or expired token'})
            
        }

    } else {
        res.status(401).json({ msg: 'unauthorized: no token provied or expired token' })
    }
})

export default authMiddleware