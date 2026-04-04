import {ITask} from '../types/task';

interface Props{
      task: ITask;
      token: string;
      onUpdate: ()=>void;
}

export const TaskCard = ({task, token, onUpdate}: Props) =>{
      // use the native MouseEvent
      const handleDelete = async (e: MouseEvent) =>{
            e.preventDefault();
            if(!globalThis.confirm("Delete this task?")) return;
            const res = await fetch(`/api/tasks/${task.id}`, {
                  method: 'DELETE',
                  headers: {'Authorization':`Bearer ${token}`}
            })

            if (res.ok) onUpdate();
      };

      const handleToggleStatus = async () =>{
            console.log("Using token for patch:", token);
            if(!token){
                  console.error("Token is missing! Can't complete request.");
                  return;
            }
            const newStatus = task.status ==='closed'?'open':'closed';
            const res = await fetch(`/api/tasks/${task.id}/status`,{
                  method: 'PATCH',
                  headers: {
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${token}`
                  },
                  body: JSON.stringify({status: newStatus})
            });
            if (!res.ok){
                  const errorData = await res.json();
                  console.log("Server rejected. Patch.", errorData)
            }
            onUpdate();
      };

      return (
            <div className='task-card' style={{border:'1px solid #ddd', padding:'15px', borderRadius:'10px',  backgroundColor: task.status ==='closed'? '#f0f0f0': '#fff',  opacity: task.status ==='closed'? 0.7:1}}>
                  <h3>{task.title}{task.tType==='bug'?'🐞' : '🚀'}</h3>
                  <p>Due: {new Date (task.dueDate).toLocaleDateString()}</p>
                  <div style ={{display:'flex', gap:'10x',marginTop:'10x'}}>
                        {/* pass the nativeEvent to our handlers */}                        
                        <button onClick={(e) => handleToggleStatus(e.nativeEvent)}>
                              {task.status ==='closed'? 'Reopen':'Complete'}
                        </button>

                        <button onClick={(e)=> handleDelete(e.nativeEvent)} style={{color:'red', borderColor:'red'}}>
                              Delete
                        </button>
                  </div>

            </div>
             )
      }