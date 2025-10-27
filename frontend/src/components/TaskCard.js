import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return '#ff4757';
      case 'MEDIUM': return '#ffa502';
      case 'LOW': return '#2ed573';
      default: return '#747d8c';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return '#2ed573';
      case 'IN_PROGRESS': return '#3742fa';
      case 'PENDING': return '#747d8c';
      default: return '#747d8c';
    }
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-badges">
          <span 
            className="priority-badge" 
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.priority}
          </span>
          <span 
            className="status-badge" 
            style={{ backgroundColor: getStatusColor(task.status) }}
          >
            {task.status}
          </span>
        </div>
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      
      {task.dueDate && (
        <div className="task-due-date">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
      
      <div className="task-actions">
        <button onClick={() => onStatusChange(task)} className="status-btn">
          {task.status === 'COMPLETED' ? 'Reopen' : 'Complete'}
        </button>
        <button onClick={() => onEdit(task)} className="edit-btn">Edit</button>
        <button onClick={() => onDelete(task.id)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;