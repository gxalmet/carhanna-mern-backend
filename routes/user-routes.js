import express from 'express';
import userController from '../controllers/user-controller.js';
import { isAuth } from '../utils.js';

var router = express.Router();

router.post('/signin', userController.signIn);
router.post('/register', userController.createUser);
router.get('/readuser:id', userController.readUser);
router.put('/updateuser:id', isAuth, userController.updateUser);
router.delete('/deleteuser:id', isAuth, userController.deleteUser);
router.get('/search', isAuth, userController.searchUser);

export default router;