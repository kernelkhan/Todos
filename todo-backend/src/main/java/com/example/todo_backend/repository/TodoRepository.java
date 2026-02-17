package com.example.todo_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.todo_backend.model.Todo; // This fixes the "Cannot find symbol" error!
import com.example.todo_backend.model.Todo;
import com.example.todo_backend.model.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}