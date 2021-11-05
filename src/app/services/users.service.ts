import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../components/user-form.component';

const port = 44387;
const BASE_URL = 'https://localhost';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser$(): Observable<User> {
    return this.http.get<any>(`${BASE_URL}:${port}/User`, httpOptions).pipe(
        catchError(this.handleError)
      );;
  }

  setUser$(input: User): Observable<User> {
    return this.http.post<User>(`${BASE_URL}:${port}/User`,input, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  } 
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
        error.message);
  }  
}

