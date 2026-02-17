package com.example.todo_backend.controller;

import com.example.todo_backend.model.Todo;
import com.example.todo_backend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.todo_backend.model.Todo;
import com.example.todo_backend.repository.TodoRepository;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin("*")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo todoDetails) {
        Todo todo = todoRepository.findById(id).orElseThrow();

        todo.setTitle(todoDetails.getTitle());
        todo.setDescription(todoDetails.getDescription());
        todo.setCompleted(todoDetails.isCompleted());
        todo.setDueDate(todoDetails.getDueDate());

        // NEW: Save the priority change
        todo.setPriority(todoDetails.getPriority());

        return todoRepository.save(todo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }
}