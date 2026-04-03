import fs from 'node:fs';
import path from 'node:path';
import {BaseTask, BugTask, FeatureTask} from '../models/Task';
import { AppError } from '../utils/AppError';

class TaskService{
      // A privacy array to hold all our taks (polimorphism in action)
      // it can hold BugTask, FeatureTask, or any other classes extending BaseTask.
      private tasks: BaseTask[] = [];
      private readonly dbPath = path.join(__dirname,'../../db.json');

      constructor(){
            this.loadFromFile();  // load existing tasks when the service starts
      }

      //1. save to file 
      private saveToFile():void{
            try{
                  //convert the array to a json string
                  const data = JSON.stringify(this.tasks,null,2);
                  fs.writeFileSync(this.dbPath, data);
            }
            catch (error){
                  console.log("System error duing File write", error);
                  throw new AppError(500, "Database write failed. Data was not saved.");
            }
      }

      //2. load from file (the tricky part)
      private loadFromFile():void{
            if (!fs.existsSync(this.dbPath)){
                  this.tasks = [];
                  return;
            }
            try{
                  const fileData = fs.readFileSync(this.dbPath, 'utf-8');
                  const rawTasks = JSON.parse(fileData);

                  //re-instantiate the classes so they have their methods back 
                  this.tasks = rawTasks.map((t:any) =>{
                      const task = t.tTtype === 'bug'?
                      new BugTask(t.title, t.severity, t.dueDate): new FeatureTask(t.title, t.impactScore, t.dueDate);

                      return Object.assign(task,t);
                  });
            }
            catch(error){
                  console.log("No existing data found or error loading.", error);
                  throw new AppError(500, "Database is corrupted or unreadable.")
            }
      }
      //Create a new Bug 
      createBug(title: string, severity: 'low'|'high', dueDate: string): BugTask{
            const newBug = new BugTask(title, severity, dueDate);
            this.tasks.push(newBug);
            this.saveToFile();
            return newBug;
      }

      // create a new Feature 
      createFeature(title: string, impact: number, dueDate: string): FeatureTask{
            const newFeature = new FeatureTask(title, impact, dueDate);
            this.tasks.push(newFeature);
            this.saveToFile();
            return newFeature;
      }

      deleteTask(id: string):boolean{
            const initialLength = this.tasks.length;
            this.tasks = this.tasks.filter(task=>task.id !==id);
            if (this.tasks.length < initialLength){
                  this.saveToFile();
                  return true;
            }
            return false;
      }
      updateTaskStatus(id:string, newStatus:'open'| 'in-progress'|'closed'):BaseTask|null{
            const task = this.tasks.find(t=>t.id ===id);
            if (task){
                  task.status = newStatus;
                  this.saveToFile();
                  return task;
            }
            return null;
      }
      searchTask(status?: string, title?:string, sortBy: 'newest'| 'oldest' = 'newest'):BaseTask[]{
            let filtered = this.tasks.filter(task => {
                  // if status is provided, it must mtach
                  const matchesStatus = status? task.status === status: true;
                  // if title is provided, it must be included (case insensetive)
                  const matchesTitle = title? task.title.toLowerCase().includes(title.toLowerCase()):true;
                  return matchesStatus && matchesTitle;
            });

            // sort the filtered results
            return filtered.sort((a,b) =>{
                  const timeA = new Date(a.createdAt).getTime();
                  const timeB = new Date(b.createdAt).getTime();

                  return sortBy == 'newest'? timeB-timeA: timeA-timeB;
            })
      }

      getAllTasks(): BaseTask[]{
            return this.tasks;
      }
      // get a summary of everything (using that abstract method!)
      getInventorySummary(): string[]{
            return this.tasks.map(task => task.getSummary());
      }


      // TaskService dashboard 
      getDashboardSummary(){
            const allTasks = this.tasks;

            return{
                  totalTasks: allTasks.length,
                  byStatus:{
                        open: allTasks.filter(t=> t.status==='open').length,
                        inProgress: allTasks.filter(t=> t.status ==='in-progress').length,
                        closed: allTasks.filter(t=> t.status ==='closed').length,
                  },
                  byType:{
                        bugs: allTasks.filter(t => t.tType ==='bug').length,
                        features: allTasks.filter(t=> t.tType==='feature').length,
                  },

                  averageFeatureImpact: allTasks.filter((t):t is FeatureTask => t.tType ==='feature')
                  .reduce((acc, curr, _, arr) => acc+curr.impactScore/arr.length, 0).toFixed(1)
            }
      }
}

// export a single instance (Singleton pattern)
// so all aroutes share the same database array. 
export const taskService = new TaskService();