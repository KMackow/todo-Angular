import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable, of} from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"})
};

@Injectable({
  providedIn: 'root'
})



export class TodoService {

  private todosUrl = 'api/todo'
  

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`TodosService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }  

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl).pipe(
        tap(todos => this.log('fetched todos')),
        catchError(this.handleError('getTodos', []))
      );
  }

  getTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get<Todo>(url).pipe(
      tap(_ => this.log(`fetched todo id=${id}`)),
      catchError(this.handleError<Todo>(`getTodo id=${id}`))
    );
  }

  updateTodo(id: number): Observable<any> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.post(url, "", httpOptions).pipe(
      tap(_ => this.log(`updated todo id=${id}`)),
      catchError(this.handleError<any>(`updateTodo id=${id}`))
    );
  }

  addTodo(todoValue: string): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todoValue, httpOptions).pipe(
      tap(_ => this.log(`added a new todo`)),
      catchError(this.handleError<Todo>(`addTodo`))
    );
  }

  deleteTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete<Todo>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted todo id=${id}`)),
      catchError(this.handleError<Todo>(`deleteTodo`))
    );
  }
}
