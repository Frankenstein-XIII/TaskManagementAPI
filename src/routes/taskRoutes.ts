import {Router} from 'express';
import { TaskController } from '../controllers/TaskController';
import { taskService } from '../services/TaskService';


const  router = Router();

//Define the endpoints 
router.get('/', TaskController.getAllTasks);
router.post('/bug', TaskController.createBug);
router.post('/feature', TaskController.createFeature);
router.delete('/:id', TaskController.deleteTask);
router.patch('/:id/status', TaskController.updateStatus);

export default router;