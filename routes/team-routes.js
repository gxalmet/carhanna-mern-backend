import express from 'express';
import teamController from '../controllers/team-controller.js';
import { isAuth } from '../utils.js';

var router = express.Router();

router.post('/createteam', isAuth, teamController.create);
router.get('/getteam:id', isAuth, teamController.read);
router.put('/updateteam:id', isAuth, teamController.update);
router.put('/deleteteam:id', isAuth, teamController.delete);

export default router;