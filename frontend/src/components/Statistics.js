import React from 'react';
import './Statistics.css';

const Statistics = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'COMPLETED').length;
  const pendingTasks = tasks.filter(task => task.status === 'PENDING').length;
  const inProgressTasks = tasks.filter(task => task.status === 'IN_PROGRESS').length;
  const highPriorityTasks = tasks.filter(task => task.priority === 'HIGH').length;
  
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Overdue tasks
  const today = new Date();
  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate || task.status === 'COMPLETED') return false;
    return new Date(task.dueDate) < today;
  }).length;

  return (
    <div className="statistics-panel">
      <h3>Task Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-number">{totalTasks}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        
        <div className="stat-card completed">
          <div className="stat-number">{completedTasks}</div>
          <div className="stat-label">Completed</div>
        </div>
        
        <div className="stat-card pending">
          <div className="stat-number">{pendingTasks}</div>
          <div className="stat-label">Pending</div>
        </div>
        
        <div className="stat-card progress">
          <div className="stat-number">{inProgressTasks}</div>
          <div className="stat-label">In Progress</div>
        </div>
        
        <div className="stat-card high-priority">
          <div className="stat-number">{highPriorityTasks}</div>
          <div className="stat-label">High Priority</div>
        </div>
        
        <div className="stat-card overdue">
          <div className="stat-number">{overdueTasks}</div>
          <div className="stat-label">Overdue</div>
        </div>
      </div>
      
      <div className="completion-rate">
        <div className="rate-label">Completion Rate</div>
        <div className="rate-bar">
          <div className="rate-fill" style={{ width: `${completionRate}%` }}></div>
        </div>
        <div className="rate-percentage">{completionRate}%</div>
      </div>
    </div>
  );
};

export default Statistics;