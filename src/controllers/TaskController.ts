import {NextFunction, Request, Response} from 'express';
import { taskService } from '../services/TaskService';
import { AppError } from '../utils/AppError';



export class TaskController{
      //GET task 
      public static getAllTasks(req: Request, res: Response, next:NextFunction): void{
            try{
                  // extract query parameters from the url eg. /tasks?status=open&title=login
                  const {status, title, sortBy} = req.query;


                  // convert query params to string if they exist (express parses them as many types)
                  const statusFilter = typeof status ==='string' ? status: undefined;
                  const titleFitler = typeof title ==='string' ? title: undefined;

                  const sortOrder= (sortBy ==='oldest')? 'oldest': 'newest';

                  // call search method 
                  const filteredTasks = taskService.searchTask(statusFilter, titleFitler, sortOrder);

                  res.status(200).json({
                        count: filteredTasks.length,
                        tasks: filteredTasks
                  });
            }
            catch(error){
                  next(error);
            }
      }

      //POST/ task/bug
      public static createBug(req: Request, res: Response): void{
            const{ title, severity, dueDate} = req.body;
            if (!title || !severity || !dueDate || Number.isNaN(Date.parse(dueDate))){
                  res.status(400).json({message: "Messing title, due date and severity are required"});
                  return;
            }

            const newBug = taskService.createBug(title, severity, dueDate);
            res.status(201).json(newBug);
      }

      // POST /task/feature
      public static createFeature(req: Request, res: Response, next: NextFunction): void{
            try{
                  const {title, impactScore, dueDate} = req.body;
                  const numericImpact = Number(impactScore);
                  if(!title|| impactScore ===null || Number.isNaN(numericImpact)){
                        throw new AppError(400, "Vlalid title and numric impactScore are required.")
                  }
                  // business logic 
                  const newFeature = taskService.createFeature(title, Number(impactScore), dueDate);
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

      public static getDashboard(req:Request, res:Response, next:NextFunction): void{
            try{
                  const stats = taskService.getDashboardSummary();
                  res.status(200).json(stats);

            }
            catch (error){
                  next(error);
            }
      }
}
