export interface ITask{
      id: string;
      title: string;
      status: 'open'|'in-progress'|'closed';
      tType:'bug'|'feature';
      dueDate:string;
      severity?:string;
      impactScore?:number;
}