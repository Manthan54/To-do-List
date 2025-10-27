import React, { useState } from 'react';
import './TaskHistory.css';

const TaskHistory = ({ tasks }) => {
  const [historyFilter, setHistoryFilter] = useState('COMPLETED');
  
  const completedTasks = tasks.filter(task => task.status === 'COMPLETED');
  const recentTasks = tasks.slice().sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
  
  const getHistoryTasks = () => {
    switch (historyFilter) {
      case 'COMPLETED':
        return completedTasks;
      case 'RECENT':
        return recentTasks.slice(0, 10);
      default:
        return completedTasks;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return '#ff4757';
      case 'MEDIUM': return '#ffa502';
      case 'LOW': return '#2ed573';
      default: return '#747d8c';
    }
  };

  return (
    <div className="task-history">
      <div className="history-header">
        <h3>Task History</h3>
        <select 
          value={historyFilter} 
          onChange={(e) => setHistoryFilter(e.target.value)}
          className="history-filter"
        >
          <option value="COMPLETED">Completed Tasks</option>
          <option value="RECENT">Recent Activity</option>
        </select>
      </div>
      
      <div className="history-list">
        {getHistoryTasks().length === 0 ? (
          <div className="no-history">
            <p>No {historyFilter.toLowerCase()} tasks yet</p>
          </div>
        ) : (
          getHistoryTasks().map(task => (
            <div key={task.id} className="history-item">
              <div className="history-content">
                <div className="history-title">{task.title}</div>
                <div className="history-meta">
                  <span 
                    className="history-priority" 
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  >
                    {task.priority}
                  </span>
                  <span className="history-status">{task.status}</span>
                  <span className="history-date">
                    {formatDate(task.updatedAt || task.createdAt)}
                  </span>
                </div>
                {task.description && (
                  <div className="history-description">{task.description}</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskHistory;