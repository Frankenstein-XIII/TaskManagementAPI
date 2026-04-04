import { useEffect, useState, useCallback} from "react"
import { ITask } from "./types/task"
import { TaskCard } from "./components/TaskCard"
import { Login } from "./components/Login";

function App(){
    const [token, setToken] = useState<string| null> (localStorage.getItem('token'));
    const [tasks, setTasks] = useState <ITask[]>([]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		setToken(null);
		setTasks([]);
    };
   const fetchTasks = useCallback(() =>{
      if (!token) return;
      fetch('/api/tasks', {
            headers:{ 'Authorization':`Bearer ${token}`}
            })
			.then(res=>{
				if(res.status===401){
					handleLogout();
					throw new Error("Session expired. Please login again.");
				}
				return res.json();
			}).then(data => setTasks(data.tasks)).catch(() => setToken(null));
    },[token]);

	useEffect(() =>{
    	fetchTasks();
    },[fetchTasks]);



  if (!token){
    return <Login onLoginSuccess = {(newToken) => setToken(newToken)}/>;
  }
  return(
    <div style= {{padding:'20px'}}>
        <button onClick={handleLogout} style={{float: 'right'}}> Logout</button>
        <h1>Task Manager Dashboard</h1>
        <div style = {{display: 'flex', flexWrap:'wrap'}}>
            {tasks.map((task) =>(
                <TaskCard key = {task.id} task={task} token={token} onUpdate={fetchTasks}/>
            ))}
        </div>
    </div>
  );
}

export default App