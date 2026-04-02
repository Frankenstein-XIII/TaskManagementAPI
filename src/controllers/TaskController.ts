import {NextFunction, Request, Response} from 'express';
import { taskService } from '../services/TaskService';
import { AppError } from '../utils/AppError';

export class TaskController{
      //GET task 
      public static getAllTasks(req: Request, res: Response): void{
            const tasks = taskService.getAllTasks();
            const summaries = taskService.getInventorySummary();

            //we send back both the full objects and summaries 
            res.status(200).json({
                  count: tasks.length,
                  tasks: tasks,
                  summaries: summaries
            });
      }

      //POST/ task/bug
      public static createBug(req: Request, res: Response): void{
            const{ title, severity} = req.body;
            if (!title || !severity){
                  res.status(400).json({message: "Messing title or severity"});
            }

            const newBug = taskService.createBug(title, severity);
            res.status(201).json(newBug);
      }

      // POST /task/feature
      public static createFeature(req: Request, res: Response, next: NextFunction): void{
            try{
                  const {title, impactScore} = req.body;
                  const numericImpact = Number(impactScore);
                  if(!title|| impactScore ===null || Number.isNaN(numericImpact)){
                        throw new AppError(400, "Vlalid title and numric impactScore are required.")
                  }
                  // business logic 
                  const newFeature = taskService.createFeature(title, Number(impactScore));
                  // success reponse 
                  res.status(201).json(newFeature)
            }
            catch (error){
                  next(error);
            }
      }

      public static deleteTask(req:Request, res:Response, next:NextFunction): void{
            try{
                  const {id} = req.params; //Get id from the URL
                  if (typeof id !== 'string'){
                        throw new AppError(404, "A valid Task ID is required.");
                  }
                  const isDeleted = taskService.deleteTask(id);

                  if (!isDeleted){
                        throw new AppError(404, `Task ID: ${id} not found`);
                  }
                  res.status(200).json({message: "Task deleted sucessfully."})
            }
            catch(error){
                  next(error);
            }
      }
      public static updateStatus(req: Request, res:Response, next:NextFunction): void{
            try{
                  const {id} = req.params;
                  const{status} = req.body;

                  const validStatuses = ['open', 'in-progress','closed'];

                  // validation: Check ID and if status if one of our allowed string
                  if(typeof id !=='string' || !validStatuses.includes(status)){
                        throw new AppError(400, "Invalid ID or Status. Use: open, in-progress,  or closed");
                  }

                  const updatedTask = taskService.updateTaskStatus(id, status);
                  if (!updatedTask){
                        throw new AppError(404, `Task with ID ${id} not found.`);
                  }
            
                  res.status(200).json(updatedTask);
            }
            catch(error){
                  next(error);
            }
      }


}
