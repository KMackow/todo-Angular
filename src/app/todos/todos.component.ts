import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo.service';
import {NgForm} from '@angular/forms';
import {Todo} from '../todo';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  filter: string = "All";  
  constructor(private todoService: TodoService) { }

  changeFilter(filter: string): void {
    this.filter = filter;
  }

  todosToDisplay(): Todo[] {
    switch(this.filter) {
      case "Completed":
        return this.todos.filter(todo => todo.isComplete === true);
      case "Outstanding":
        return this.todos.filter(todo => todo.isComplete === false);
      default:
        return this.todos;
    }
  }

  isComplete(status) {
    return {"text-decoration": status ? "line-through" : "none"}
  }

  addTodo(f: NgForm): void {
    this.todoService.addTodo(JSON.stringify(f.value))
    .subscribe(todo => this.todos.push(todo));
    f.reset();
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos);
  }

  delete(todo: Todo): void {
    this.todoService.deleteTodo(todo.id)
      .subscribe(_ => {
        this.todos = this.todos.filter(atodo => atodo !== todo);
      });
  }

  deleteCompleted(): void {
    this.todos.forEach(todo => todo.isComplete ? this.delete(todo) : null);
  }

  onSelect(todo: Todo): void {
    this.todoService.updateTodo(todo.id)
      .subscribe(_ => {
        todo.isComplete = !todo.isComplete;        
      });
  }

  ngOnInit() {
    this.getTodos();
  }

}
