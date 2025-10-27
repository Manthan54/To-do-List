package com.todo.backend.repository;

import com.todo.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    
    @Query("SELECT DISTINCT t FROM Task t WHERE t.id IN (SELECT ta.taskId FROM TaskAssignee ta WHERE ta.userId = :userId)")
    List<Task> findTasksByUserId(@Param("userId") Long userId);
}
