//1. The Interface (The shape/ Contract)
// This defines what a task object looks like in our JSON responses 

export interface ITask{
      id: string;
      title: string;
      tType: 'bug'|'feature';
      status: 'open'|'in-progress'|'closed';
}

//2. the Abstract class (The blueprint)
//we use this to privide shared fuctionality to different task types 
export abstract class BaseTask implements ITask{
      public id: string;
      public createdAt: Date;
      public status: 'open'| 'in-progress'|'closed' = 'open';
      // make tTtype abstract so the subclass must define it. 
      public abstract tType: 'bug'|'feature';

      constructor(public title: string){
            this.id  = Math.random().toString(36).substring(2,9);
            this.createdAt = new Date();
      }

      // Common Logic: Every task can be logged 
      logTaskDetails(): void{
            console.log(`[Task ${this.id}] ${this.title} - Status: ${this.status}`);
      }

      // Abstract method: every specific task type must define its own summary logic 
      abstract getSummary():string;
}

// 3. Concrete Class (The actual task)
export class BugTask extends BaseTask{
      public readonly  tType:'bug' = 'bug' as const;
      constructor(title: string, public severity: 'low'|'high'){
            super(title);
      }

      getSummary(): string {
            return `BUG: ${this.title} (Severity: ${this.severity})`;
      }
}

export class FeatureTask extends BaseTask{
      public readonly tType: "feature" = "feature" as const;
      constructor(title: string, public impactScore: number){
            super(title);
      }

      getSummary(): string {
            return `Feature: ${this.title} (Impact: ${this.impactScore}/10)`;
      }
}