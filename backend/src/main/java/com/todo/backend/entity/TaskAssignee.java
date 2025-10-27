package com.todo.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "task_assignees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskAssignee {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "task_id", nullable = false)
    private Long taskId;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
}