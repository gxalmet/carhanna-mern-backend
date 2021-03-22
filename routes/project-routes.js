import express from 'express';

import projectController from '../controllers/project-controller.js';
import { isAuth } from '../utils.js';

var router = express.Router();

router.post('/createproject', isAuth, projectController.create);
router.get('/getproject:id', isAuth, projectController.read);
router.get('/searchprojects', isAuth, projectController.search);
router.put('/updateproject:id', isAuth, projectController.update);
router.delete('/deleteproject/:id', isAuth, projectController.delete);

export default router;