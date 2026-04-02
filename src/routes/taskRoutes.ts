import {Router} from 'express';
import { TaskController } from '../controllers/TaskController';


const  router = Router();

//Define the endpoints 
router.get('/', TaskController.getAllTasks);
router.post('/bug', TaskController.createBug);
router.post('/feature', TaskController.createFeature);

export default router;