import React, { useState, useEffect } from 'react';
import UserSearch from './UserSearch';
import { taskAPI } from '../services/api';
import './TaskModal.css';

const TaskModal = ({ isOpen, onClose, onSave, task = null, currentUser }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'MEDIUM',
    status: 'PENDING'
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        priority: task.priority || 'MEDIUM',
        status: task.status || 'PENDING'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'MEDIUM',
        status: 'PENDING'
      });
    }
  }, [task, isOpen]);

  // Auto-set priority based on due date
  useEffect(() => {
    if (formData.dueDate && !task) { // Only for new tasks
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      const diffTime = selectedDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let autoPriority = 'MEDIUM';
      if (diffDays <= 1) {
        autoPriority = 'HIGH'; // Due today or tomorrow
      } else if (diffDays <= 3) {
        autoPriority = 'MEDIUM'; // Due within 3 days
      } else {
        autoPriority = 'LOW'; // Due later
      }
      
      setFormData(prev => ({ ...prev, priority: autoPriority }));
    }
  }, [formData.dueDate, task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate due date
    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        alert('Due date cannot be in the past!');
        return;
      }
    }
    
    const taskData = {
      ...formData,
      dueDate: formData.dueDate ? `${formData.dueDate}T00:00:00` : null
    };
    onSave(taskData);
    onClose();
  };

  const handleUserAssign = async (user) => {
    try {
      await taskAPI.assignTask(task.id, user.id);
      alert(`Task assigned to ${user.username} successfully!`);
    } catch (error) {
      console.error('Error assigning task:', error);
      alert('Failed to assign task');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="3"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>
          
          {task && (
            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          )}
          
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {task ? 'Update' : 'Create'} Task
            </button>
          </div>
        </form>
        
        {task && (
          <div className="assign-users-section">
            <h3>Assign to Additional Users</h3>
            <UserSearch 
              onUserSelect={handleUserAssign}
              excludeUserId={currentUser?.id}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskModal;