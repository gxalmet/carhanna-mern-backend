import screamController from '../controllers/scream-controller.js';
import { isAuth } from '../utils.js';
import express from 'express';

var router = express.Router();


router.post('/createscream', isAuth, screamController.create);
router.get('/getscream:id', isAuth, screamController.read);
router.put('/updatescream:id', isAuth, screamController.update);
router.delete('/deletescream/:id', isAuth, screamController.delete);

export default router;