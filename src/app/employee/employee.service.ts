import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiEndPoint } from '../../models/constants';
import { Employee } from '../../models/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  /**
  * Gets list of Employee
  */
  public get(): Observable<any> {
    const url = environment.apiUrl + ApiEndPoint.employees;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.httpClient.get<Employee>(url, httpOptions).pipe(catchError(this.errorMgmt));
  }

  /**
  * Get a Employee by Id
  */
  getById(id): Observable<any> {
    const url = environment.apiUrl + ApiEndPoint.employee + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'Token ' + localStorage.getItem('userid')
      })
    }
    return this.httpClient.get<Employee>(url, httpOptions).pipe(catchError(this.errorMgmt));;
  }

  /**
  * Update a Employee
  */
  put(employee: Employee): Observable<any> {
    const url = environment.apiUrl + ApiEndPoint.update + employee.id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.httpClient.put<any>(url, employee, httpOptions).pipe(catchError(this.errorMgmt));
  }

  /**
  * Create a Employee
  */
  create(employee): Observable<any> {
    const url = environment.apiUrl + ApiEndPoint.create;
    console.log(environment);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.httpClient.post<any>(url, employee, httpOptions).pipe(catchError(this.errorMgmt));
  }

  /**
  * Delete a Employee
  */
  delete(employee: Employee): Observable<any> {
    const url = environment.apiUrl + ApiEndPoint.delete + employee.id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.httpClient.delete<any>(url, httpOptions).pipe(catchError(this.errorMgmt));
  }

  /**
  * Error Handling
  */
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;

    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
