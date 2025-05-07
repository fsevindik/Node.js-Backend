import express from 'express';
import { register } from '../controllers/auth';

const router = express.Router();


router.post("/register",register)
router.post("/login",login)


router.post("/product",auth , asdasd)  // for example : u need to create product in website and u need to be admin for this process

const auth = (req, res, next) => {
    // Middleware to check if the user is authenticated
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "Unauthorized !!1" });
};

export default router;


