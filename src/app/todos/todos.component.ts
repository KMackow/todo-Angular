import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo.service';
import {Todo} from '../todo';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  constructor(private todoService: TodoService) { }

  isComplete(status) {
    return {"text-decoration": status ? "line-through" : "none"}
  }

  onSelect(todo: Todo): void {
    todo.isComplete = !todo.isComplete;
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos);
  }

  ngOnInit() {
    this.getTodos();
  }

}
