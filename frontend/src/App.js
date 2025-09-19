
import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ToDoList from './Components/ToDoList'
import About from './Components/About';
import Contact_me from './Components/Contact_me';
import LoginSign_page from './Components/LoginSign_page';

// {/* "/contact" as type kele ki Contact_me hya page var navigate honar */}
const App = () => {
  return (
    
    <Routes>
      <Route path='/' element={<LoginSign_page/>}> </Route> 
      <Route path='/Contact' element={<Contact_me/>}></Route>
      
      <Route path='/About' element={<About/>}></Route>
      <Route path='/todolist' element={<ToDoList/>}></Route>
      
    </Routes>
    
    
  )
}

export default App


// import React, { useState } from 'react';
// import Navbar from './Components/Navbar';
// import './App.css';
// import LoginSign_page from './Components/LoginSign_page';

// function App() {

//   const [arr,setArr]=useState([]);
//   const [input,setInput]=useState("");
  
//   const handleAddTask = () =>{
//     if(input.trim() !== ""){
//       setArr([input,...arr]);//...arr stores multiple inputs
//       setInput("");

//     }
    
//   } 
//   return (
//     <div>
//       {/* <h1>My To-Do List</h1> */}

//       <Navbar/>
//       <LoginSign_page/>
      
//       <div className="container">
//         <h1 className='h1'> To-Do List </h1>

//         <div className="stats">
//             <div className="stat-card">
//                 <div className="stat-number" id="totalTasks">0</div>
//                 <div className="stat-label">Total Tasks</div>
//             </div>

//             <div className="stat-card">
//                 <div className="stat-number" id="completedTasks">0</div>
//                 <div className="stat-label">Completed</div>
//             </div>
            
//             <div className="stat-card">
//                 <div className="stat-number" id="pendingTasks">0</div>
//                 <div className="stat-label">Pending</div>
//             </div>
//         </div>


//         <div className="card">
//           <input type="text" 
//           placeholder='Enter To dos' 
//           className='textinput' 
//           value={input} 
//           onChange={(e) => setInput(e.target.value)}/>
//           <label htmlFor="text"></label>
//           <button id='AddTaskBUtton' onClick={handleAddTask}> + Add Task</button>
//         </div>
        
//         <div className="filter" >
//           <button id='but1'>All</button>
//           <button id='PendingButton'>Pending</button>
//           <button id='CompletedButton'>Completed</button>
//         </div>

//         <div className="tasks-container">
//           {arr.length === 0 ? (
//             <div className="empty-state">
//               <h3>No tasks yet</h3>
//               <p>Add a task above to get started!</p>
//             </div>
//           ) : (
//             <ul>
//               {arr.map((task, index) => (
//                 <li key={index}>{task}</li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// export default App;

// // import React, { useState } from 'react';
// // import Navbar from './Components/Navbar';
// // import './App.css';

// // function App() {
// //   const [tasks, setTasks] = useState([]);       // store all tasks
// //   const [input, setInput] = useState("");       // store input field
// //   const [filter, setFilter] = useState("all");  // filter: all, pending, completed

// //   // Handle adding task
// //   const handleAddTask = () => {
// //     if (input.trim() === "") return;

// //     const newTask = {
// //       id: Date.now(),       // unique id
// //       text: input,
// //       completed: false
// //     };

// //     setTasks([...tasks, newTask]);
// //     setInput(""); // clear input
// //   };

// //   // Toggle complete
// //   const toggleComplete = (id) => {
// //     setTasks(
// //       tasks.map((task) =>
// //         task.id === id ? { ...task, completed: !task.completed } : task
// //       )
// //     );
// //   };

// //   // Filter tasks
// //   const filteredTasks = tasks.filter((task) => {
// //     if (filter === "completed") return task.completed;
// //     if (filter === "pending") return !task.completed;
// //     return true; // all
// //   });

// //   // Stats
// //   const totalTasks = tasks.length;
// //   const completedTasks = tasks.filter((t) => t.completed).length;
// //   const pendingTasks = totalTasks - completedTasks;

// //   return (
// //     <div>
// //       <Navbar/>
// //       <div className="container">
// //         <h1 className='h1'> To-Do List </h1>

// //         {/* Stats */}
// //         <div className="stats">
// //           <div className="stat-card">
// //             <div className="stat-number">{totalTasks}</div>
// //             <div className="stat-label">Total Tasks</div>
// //           </div>

// //           <div className="stat-card">
// //             <div className="stat-number">{completedTasks}</div>
// //             <div className="stat-label">Completed</div>
// //           </div>
          
// //           <div className="stat-card">
// //             <div className="stat-number">{pendingTasks}</div>
// //             <div className="stat-label">Pending</div>
// //           </div>
// //         </div>

// //         {/* Input + Add Button */}
// //         <div className="card">
// //           <input
// //             type="text"
// //             placeholder="Enter To dos"
// //             className="textinput"
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //           />
// //           <button id="AddTaskButton" onClick={handleAddTask}> + Add Task </button>
// //         </div>

// //         {/* Filter Buttons */}
// //         <div className="filter">
// //           <button onClick={() => setFilter("all")}>All</button>
// //           <button onClick={() => setFilter("pending")}>Pending</button>
// //           <button onClick={() => setFilter("completed")}>Completed</button>
// //         </div>

// //         {/* Task List */}
// //         <div className="tasks-container">
// //           {filteredTasks.length === 0 ? (
// //             <div className="empty-state">
// //               <h3>No tasks yet</h3>
// //               <p>Add a task above to get started!</p>
// //             </div>
// //           ) : (
// //             <ul>
// //               {filteredTasks.map((task) => (
// //                 <li
// //                   key={task.id}
// //                   onClick={() => toggleComplete(task.id)}
// //                   style={{
// //                     textDecoration: task.completed ? "line-through" : "none",
// //                     cursor: "pointer"
// //                   }}
// //                 >
// //                   {task.text}
// //                 </li>
// //               ))}
// //             </ul>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;
