import {BaseTask, BugTask, FeatureTask} from '../models/Task';

class TaskService{
      // A privacy array to hold all our taks (polimorphism in action)
      // it can hold BugTask, FeatureTask, or any other classes extending BaseTask.
      private tasks: BaseTask[] = [];

      //Create a new Bug 
      createBug(title: string, severity: 'low'|'high'): BugTask{
            const newBug = new BugTask(title, severity);
            this.tasks.push(newBug);
            return newBug;
      }

      // create a new Feature 
      createFeature(title: string, impact: number): FeatureTask{
            const newFeature = new FeatureTask(title, impact);
            this.tasks.push(newFeature);
            return newFeature;
      }

      deleteTask(id: string):boolean{
            const initialLength = this.tasks.length;
            this.tasks = this.tasks.filter(task=>task.id !==id);
            return this.tasks.length<initialLength;
      }
      updateTaskStatus(id:string, newStatus:'open'| 'in-progress'|'closed'):BaseTask|null{
            const task = this.tasks.find(t=>t.id ===id);
            if (task){
                  task.status = newStatus;
                  return task;
            }
            return null;
      }

      getAllTasks(): BaseTask[]{
            return this.tasks;
      }
      // get a summary of everything (using that abstract method!)
      getInventorySummary(): string[]{
            return this.tasks.map(task => task.getSummary());
      }
}

// export a single instance (Singleton pattern)
// so all aroutes share the same database array. 
export const taskService = new TaskService();