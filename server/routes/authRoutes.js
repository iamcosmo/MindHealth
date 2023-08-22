import express from 'express';
import { register,login,testController } from '../controllers/authControllers.js';
import { requireSignIn,isAdmin} from './../middlewares/authMiddleware.js';
const router = express.Router();
// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

//test Routes
router.get('/test',requireSignIn,isAdmin,testController);

export default router;
