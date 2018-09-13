import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  todos: Todo[] = [];
 
  constructor(private todoService: TodoService) { }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => {
        this.todos = todos.filter(todo => !todo.isComplete).slice(0, 4)
      });
  }
  
  onSelect(todo: Todo): void {
    this.todoService.updateTodo(todo.id)
      .subscribe(_ => {
        this.getTodos();
      });
  }
 
  ngOnInit() {
    this.getTodos();
  }
 
  
}