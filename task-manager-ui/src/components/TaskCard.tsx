import {ITask} from '../types/task';

interface Props{
      task: ITask;
}

export const TaskCard = ({task}: Props) =>{
      return (
            <div style = {{border: '1px solid #ccc', margin: '10px', padding:'10px', borderRadius:'8px'}}>
            <h3>{task.title}</h3>
            <p> Status: <strong>{task.status}</strong></p>
            <p>Type: {task.tType ==='bug'?'Bug': 'Feature'}</p>
            <small>Due: {new Date (task.dueDate).toLocaleDateString()}</small>
            </div>
            
      )
}