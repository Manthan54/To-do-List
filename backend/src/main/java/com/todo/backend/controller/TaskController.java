package com.todo.backend.controller;

import com.todo.backend.entity.Task;
import com.todo.backend.entity.TaskAssignee;
import com.todo.backend.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.createTask(task));
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Task>> getUserTasks(@PathVariable Long userId) {
        return ResponseEntity.ok(taskService.getTasksByUserId(userId));
    }

    @PostMapping("/{taskId}/assign/{userId}")
    public ResponseEntity<TaskAssignee> assignTask(@PathVariable Long taskId, @PathVariable Long userId) {
        try {
            TaskAssignee assignment = taskService.assignTaskToUser(taskId, userId);
            return ResponseEntity.ok(assignment);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{taskId}/assign/{userId}")
    public ResponseEntity<Void> unassignTask(@PathVariable Long taskId, @PathVariable Long userId) {
        taskService.unassignTaskFromUser(taskId, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{taskId}/assignees")
    public ResponseEntity<List<TaskAssignee>> getTaskAssignees(@PathVariable Long taskId) {
        return ResponseEntity.ok(taskService.getTaskAssignees(taskId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        return taskService.getTaskById(id)
                .map(task -> {
                    task.setTitle(updatedTask.getTitle());
                    task.setDescription(updatedTask.getDescription());
                    task.setStatus(updatedTask.getStatus());
                    task.setPriority(updatedTask.getPriority());
                    task.setDueDate(updatedTask.getDueDate());
                    return ResponseEntity.ok(taskService.updateTask(task));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
