// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [task, setTask] = useState({ name: '', description: '', status: 'pending' });
//   const [editing, setEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);

//   // Fetch tasks from the backend
//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/tasks');
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // Handle form input changes
//   const handleChange = (e) => {
//     setTask({ ...task, [e.target.name]: e.target.value });
//   };

//   // Handle add/update task
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editing) {
//         await axios.put(\`http://localhost:5000/tasks/\${currentId}\`, task);
//       } else {
//         await axios.post('http://localhost:5000/tasks', task);
//       }
//       // Reset form
//       setTask({ name: '', description: '', status: 'pending' });
//       setEditing(false);
//       setCurrentId(null);
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Populate form with task data for editing
//   const handleEdit = (taskItem) => {
//     setTask({ name: taskItem.name, description: taskItem.description, status: taskItem.status });
//     setEditing(true);
//     setCurrentId(taskItem.id);
//   };

//   // Delete task
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(\`http://localhost:5000/tasks/\${id}\`);
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">To‑Do List</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Task Name</label>
//           <input
//             type="text"
//             className="form-control"
//             name="name"
//             value={task.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             className="form-control"
//             name="description"
//             value={task.description}
//             onChange={handleChange}
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label>Status</label>
//           <select
//             className="form-control"
//             name="status"
//             value={task.status}
//             onChange={handleChange}
//           >
//             <option value="pending">Pending</option>
//             <option value="completed">Completed</option>
//           </select>
//         </div>
//         <button type="submit" className="btn btn-primary mt-3">
//           {editing ? 'Update Task' : 'Add Task'}
//         </button>
//       </form>
//       <hr />
//       <h3>Tasks</h3>
//       <ul className="list-group">
//         {tasks.map(taskItem => (
//           <li
//             key={taskItem.id}
//             className="list-group-item d-flex justify-content-between align-items-center"
//           >
//             <div>
//               <h5>{taskItem.name}</h5>
//               <p>{taskItem.description}</p>
//               <small>Status: {taskItem.status}</small>
//             </div>
//             <div>
//               <button
//                 className="btn btn-info btn-sm mr-2"
//                 onClick={() => handleEdit(taskItem)}
//               >
//                 Edit
//               </button>
//               <button
//                 className="btn btn-danger btn-sm"
//                 onClick={() => handleDelete(taskItem.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ name: '', description: '', status: 'pending' });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Handle add/update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:5000/tasks/${currentId}`, task);
      } else {
        await axios.post('http://localhost:5000/tasks', task);
      }
      // Reset form
      setTask({ name: '', description: '', status: 'pending' });
      setEditing(false);
      setCurrentId(null);
      fetchTasks();  // Refresh tasks list
    } catch (err) {
      console.error('Error submitting task:', err);
    }
  };

  // Populate form with task data for editing
  const handleEdit = (taskItem) => {
    setTask({ name: taskItem.name, description: taskItem.description, status: taskItem.status });
    setEditing(true);
    setCurrentId(taskItem.id);
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks();  // Refresh tasks list
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">To‑Do List</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={task.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={task.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            className="form-control"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {editing ? 'Update Task' : 'Add Task'}
        </button>
      </form>
      <hr />
      <h3>Tasks</h3>
      <ul className="list-group">
        {tasks.map((taskItem) => (
          <li
            key={taskItem.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{taskItem.name}</h5>
              <p>{taskItem.description}</p>
              <small>Status: {taskItem.status}</small>
            </div>
            <div>
              <button
                className="btn btn-info btn-sm mr-2"
                onClick={() => handleEdit(taskItem)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(taskItem.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
