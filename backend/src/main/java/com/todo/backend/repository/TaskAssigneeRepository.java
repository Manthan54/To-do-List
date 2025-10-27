package com.todo.backend.repository;

import com.todo.backend.entity.TaskAssignee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskAssigneeRepository extends JpaRepository<TaskAssignee, Long> {
    
    List<TaskAssignee> findByUserId(Long userId);
    List<TaskAssignee> findByTaskId(Long taskId);
    TaskAssignee findByTaskIdAndUserId(Long taskId, Long userId);
}