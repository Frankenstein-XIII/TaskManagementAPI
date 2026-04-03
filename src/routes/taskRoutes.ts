import {Router} from 'express';
import { TaskController } from '../controllers/TaskController';


const  router = Router();

//Define the endpoints 
router.get('/', TaskController.getAllTasks);
router.post('/bug', TaskController.createBug);
router.post('/feature', TaskController.createFeature);
router.delete('/:id', TaskController.deleteTask);
router.patch('/:id/status', TaskController.updateStatus);
router.get('/dashboard', TaskController.getDashboard);

export default router;