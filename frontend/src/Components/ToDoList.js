import React, { useState } from 'react';
import Navbar from './Navbar';
import './Todolist.css';


function ToDoList() {

  const [task,setTask]=useState([]);
  const [input,setInput]=useState("");
  const [filter,setFilter]=useState("All");
 
  const filteredTasks=task.filter((input)=>{
    if(filter === "All") return true;
    if(filter === "Pending") return !input.completed;
    if(filter === "Completed") return input.completed;
    return true;
  });

  const toggleComplete = (id) => {
    setTask(task.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = () =>{
    if(input.trim() !== ""){
      const t = {
        id: Date.now(),
        text: input.trim(),
        completed: false
      };
      setTask([t,...task]);//...task stores multiple inputs
      setInput("");
    }  
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };
  const deleteTask = (id) => {
    setTask(task.filter(task => task.id !== id));
  };
  
  const totalTasks = task.length;
  const completedTasks = task.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  return (
    <div>
      {/* <h1>My To-Do List</h1> */}

      <Navbar/>
      
      
      <div className="container1">
        <h1 className='h1'> To-Do List </h1>

        <div className="stats">
            <div className="stat-card">
                <div className="stat-number" >{totalTasks}</div>
                <div className="stat-label">Total Tasks</div>
            </div>

            <div className="stat-card">
                <div className="stat-number" >{completedTasks}</div>
                <div className="stat-label">Completed</div>
            </div>
            
            <div className="stat-card">
                <div className="stat-number" >{pendingTasks}</div>
                <div className="stat-label">Pending</div>
            </div>
        </div>


        <div className="card">
          <input type="text" 
          placeholder='Enter To dos' 
          className='textinput' 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}/>
          
          <label htmlFor="text"></label>
          <button id='AddTaskBUtton' onClick={handleAddTask}> + Add Task</button>
        </div>
        
        <div className="filter" >
          <button className={filter === "All" ? "active" : ""} onClick={()=>setFilter("All")}>All</button>
          <button className={filter === "Pending" ? "active" : ""} onClick={()=>setFilter("Pending")}>Pending</button>
          <button className={filter === "Completed" ? "active" : ""} onClick={()=>setFilter("Completed")}>Completed</button>
        </div>

        <div className="tasks-container">
          {task.length === 0 ? (
            <div className="empty-state">
              <h3>
                {filter === "All" ? "No tasks yet" : 
                 filter === "Completed" ? "No completed tasks" : 
                 "No pending tasks"}
              </h3>
              <p>
                {filter === "All" ? "Add a task above to get started!" :
                 filter === "Completed" ? "Complete some tasks to see them here!" :
                 "All tasks are completed!"}
              </p>
            </div>
          ) : (
            // <ul>
            //   {filteredTasks.map((task, index) => (
            //     <li key={index}>{task}</li>
            //   ))}
            // </ul>
            // <ul>
            //   {filteredTasks.map((task) => (
            //     <li 
            //       key={task.id}
            //       className={task.completed ? "completed" : ""}
            //     >
            //       <div className="task-content">
            //         <span 
            //           onClick={() => toggleComplete(task.id)}
            //           className="task-text"
            //         >
            //           {task.text}
            //         </span>
                    
            //       </div>
            //     </li>
            //   ))}
            // </ul>
            <ul>
              {filteredTasks.map((tasks) => (
                <li 
                  key={tasks.id}
                  className={tasks.completed ? "completed" : ""}
                >
                  <div className="task-content">
                    <span 
                      onClick={() => toggleComplete(tasks.id)}
                      className="task-text"
                    >
                      {tasks.text}
                    </span>
                    <button 
                      className="delete-btn"
                      onClick={() => deleteTask(tasks.id)}
                      title="Delete task"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

    </div>
  );
};

export default ToDoList;

// import React, { useState } from 'react';
// import Navbar from './Components/Navbar';
// import './App.css';

// function App() {
//   const [tasks, setTasks] = useState([]);       // store all tasks
//   const [input, setInput] = useState("");       // store input field
//   const [filter, setFilter] = useState("all");  // filter: all, pending, completed

//   // Handle adding task
//   const handleAddTask = () => {
//     if (input.trim() === "") return;

//     const newTask = {
//       id: Date.now(),       // unique id
//       text: input,
//       completed: false
//     };

//     setTasks([...tasks, newTask]);
//     setInput(""); // clear input
//   };

//   // Toggle complete
//   const toggleComplete = (id) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === id ? { ...task, completed: !task.completed } : task
//       )
//     );
//   };

//   // Filter tasks
//   const filteredTasks = tasks.filter((task) => {
//     if (filter === "completed") return task.completed;
//     if (filter === "pending") return !task.completed;
//     return true; // all
//   });

//   // Stats
//   const totalTasks = tasks.length;
//   const completedTasks = tasks.filter((t) => t.completed).length;
//   const pendingTasks = totalTasks - completedTasks;

//   return (
//     <div>
//       <Navbar/>
//       <div className="container">
//         <h1 className='h1'> To-Do List </h1>

//         {/* Stats */}
//         <div className="stats">
//           <div className="stat-card">
//             <div className="stat-number">{totalTasks}</div>
//             <div className="stat-label">Total Tasks</div>
//           </div>

//           <div className="stat-card">
//             <div className="stat-number">{completedTasks}</div>
//             <div className="stat-label">Completed</div>
//           </div>
          
//           <div className="stat-card">
//             <div className="stat-number">{pendingTasks}</div>
//             <div className="stat-label">Pending</div>
//           </div>
//         </div>

//         {/* Input + Add Button */}
//         <div className="card">
//           <input
//             type="text"
//             placeholder="Enter To dos"
//             className="textinput"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <button id="AddTaskButton" onClick={handleAddTask}> + Add Task </button>
//         </div>

//         {/* Filter Buttons */}
//         <div className="filter">
//           <button onClick={() => setFilter("all")}>All</button>
//           <button onClick={() => setFilter("pending")}>Pending</button>
//           <button onClick={() => setFilter("completed")}>Completed</button>
//         </div>

//         {/* Task List */}
//         <div className="tasks-container">
//           {filteredTasks.length === 0 ? (
//             <div className="empty-state">
//               <h3>No tasks yet</h3>
//               <p>Add a task above to get started!</p>
//             </div>
//           ) : (
//             <ul>
//               {filteredTasks.map((task) => (
//                 <li
//                   key={task.id}
//                   onClick={() => toggleComplete(task.id)}
//                   style={{
//                     textDecoration: task.completed ? "line-through" : "none",
//                     cursor: "pointer"
//                   }}
//                 >
//                   {task.text}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
