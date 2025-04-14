import express from 'express'
import { registerUser, loginUser, getUserProfile, deleteUser } from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'
//import passport from 'passport'
const userRoute = express.Router()

/* userRoute.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

userRoute.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    }));
     */
userRoute.post('/register', registerUser)
userRoute.post('/login', loginUser)
userRoute.get('/profile', authMiddleware, getUserProfile)
userRoute.delete('/profile', authMiddleware, deleteUser)

export default userRoute