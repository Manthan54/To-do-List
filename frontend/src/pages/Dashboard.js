import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { taskAPI } from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import Statistics from '../components/Statistics';
import TaskHistory from '../components/TaskHistory';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('ALL');

  const fetchUserTasks = useCallback(async () => {
    if (!user) return;
    try {
      // Get only tasks assigned to this user
      const response = await taskAPI.getUserTasks(user.id);
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUserTasks();
  }, [fetchUserTasks]);

  const handleCreateTask = async (taskData) => {
    try {
      const response = await taskAPI.createTask(taskData);
      console.log('Task created successfully:', response.data);
      
      // Auto-assign task to creator
      await taskAPI.assignTask(response.data.id, user.id);
      console.log('Task assigned to creator');
      
      // Fetch only user's tasks
      fetchUserTasks();
      
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await taskAPI.updateTask(editingTask.id, taskData);
      fetchUserTasks();
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(taskId);
        fetchUserTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleStatusChange = async (task) => {
    const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    try {
      await taskAPI.updateTask(task.id, { ...task, status: newStatus });
      fetchUserTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredTasks = Array.isArray(tasks) ? tasks.filter(task => {
    if (filter === 'ALL') return true;
    return task.status === filter;
  }) : [];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Todo Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user?.username}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-grid">
          <div className="main-content">
            <Statistics tasks={tasks} />
            
            <div className="todo-container">
              <div className="todo-header">
                <h2>My Tasks</h2>
                <div className="header-actions">
                  <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="ALL">All Tasks</option>
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                  <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="add-todo-btn"
                  >
                    + Add Task
                  </button>
                </div>
              </div>
              
              <div className="todo-list">
                {loading ? (
                  <div className="loading-state">Loading tasks...</div>
                ) : filteredTasks.length === 0 ? (
                  <div className="empty-state">
                    <h3>No tasks found</h3>
                    <p>{filter === 'ALL' ? 'Create your first task to get started!' : `No ${filter.toLowerCase()} tasks.`}</p>
                  </div>
                ) : (
                  filteredTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={setEditingTask}
                      onDelete={handleDeleteTask}
                      onStatusChange={handleStatusChange}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
          
          <div className="sidebar">
            <TaskHistory tasks={tasks} />
          </div>
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen || editingTask !== null}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
        currentUser={user}
      />
    </div>
  );
};

export default Dashboard;