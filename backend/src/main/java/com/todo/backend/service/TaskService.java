package com.todo.backend.service;

import com.todo.backend.entity.Task;
import com.todo.backend.entity.TaskAssignee;
import com.todo.backend.entity.User;
import com.todo.backend.repository.TaskRepository;
import com.todo.backend.repository.TaskAssigneeRepository;
import com.todo.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskAssigneeRepository taskAssigneeRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, TaskAssigneeRepository taskAssigneeRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.taskAssigneeRepository = taskAssigneeRepository;
        this.userRepository = userRepository;
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findTasksByUserId(userId);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public TaskAssignee assignTaskToUser(Long taskId, Long userId) {
        // Check if assignment already exists
        TaskAssignee existing = taskAssigneeRepository.findByTaskIdAndUserId(taskId, userId);
        if (existing != null) {
            return existing;
        }
        
        TaskAssignee assignment = TaskAssignee.builder()
                .taskId(taskId)
                .userId(userId)
                .build();
        return taskAssigneeRepository.save(assignment);
    }

    public void unassignTaskFromUser(Long taskId, Long userId) {
        TaskAssignee assignment = taskAssigneeRepository.findByTaskIdAndUserId(taskId, userId);
        if (assignment != null) {
            taskAssigneeRepository.delete(assignment);
        }
    }

    public List<TaskAssignee> getTaskAssignees(Long taskId) {
        return taskAssigneeRepository.findByTaskId(taskId);
    }
}
