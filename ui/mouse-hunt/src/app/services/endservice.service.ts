import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { catchError, Observable, of } from 'rxjs';

import{Building} from "../building"

@Injectable({
  providedIn: 'root'
})
export class EndserviceService {
  url = ''
  constructor(private http:HttpClient) { }

  getAllBuilding():Observable<Building[]>{
    return this.http.get<Building[]>(this.url).pipe(
      catchError(this.handleError<Building[]>('get all buildings'))
    )
  }

  









  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
    // TODO: better job of transforming error for user consumption
    EndserviceService.log(`${operation} failed: ${error.message}`);
    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }


  /** Log a CourseService message with the MessageService */
  private static log(message: string) {
    console.log(message);
  }
}

