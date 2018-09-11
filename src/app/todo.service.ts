import { Injectable } from '@angular/core';
import { Todo } from './todo';
import {TODOS} from './todos'
import { Observable, of} from 'rxjs'
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    private log(message: string) {
      this.messageService.add("TodosService: ${message}");
    }
  getTodos(): Observable<Todo[]> {
    return of(TODOS);
  }
}
