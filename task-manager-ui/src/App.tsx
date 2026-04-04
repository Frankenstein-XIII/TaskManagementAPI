import { useEffect, useState} from "react"
import { ITask } from "./types/task"
import { TaskCard } from "./components/TaskCard"
import { Login } from "./components/Login";

function App(){
    const [token, setToken] = useState<string| null> (localStorage.getItem('token'));
  const [tasks, setTasks] = useState <ITask[]>([]);


  useEffect(() =>{
    if (!token) return;

    fetch('/api/tasks', {
        headers:{ 'Authorization':`Bearer ${token}`}

    }).then(res=>res.json()).then(data => setTasks(data.tasks)).catch(() => setToken(null));
  },[token]);

  const handleLogout = () =>{
    localStorage.removeItem('token');
    setToken(null);
    setTasks([]);
  }

  if (!token){
    return <Login onLoginSuccess = {(newToken) => setToken(newToken)}/>;
  }
  return(
    <div style= {{padding:'20px'}}>
        <button onClick={handleLogout} style={{float: 'right'}}> Logout</button>
        <h1>Task Manager Dashboard</h1>
        <div style = {{display: 'flex', flexWrap:'wrap'}}>
            {tasks.map((task) =>(
                <TaskCard key = {task.id} task={task}/>
            ))}
        </div>
    </div>
  );
}

export default App
