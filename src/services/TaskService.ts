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