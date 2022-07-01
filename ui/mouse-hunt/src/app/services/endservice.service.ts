import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

import{Building} from "../models/building"
import { floors } from '../models/floors';
import { checklist } from '../models/checklist';
import { room } from '../models/rooms';
import { Dashboard } from '../models/Dashboard';
import { Table } from '../models/Table';

@Injectable({
  providedIn: 'root'
})
export class EndserviceService {
  private url = 'http://localhost:3000'
  constructor(private http:HttpClient) { }

  getAllBuilding():Observable<Building[]>{
    const buildingurl = `${this.url}/buildings`
    return this.http.get<Building[]>(buildingurl).pipe(
      tap(()=> EndserviceService.log('Getting course')),
      catchError(this.handleError<Building[]>('could not buildings'))
    )
  }

  getRooms(buildingID:string|null, level:string|null):Observable<room[]>{
      const floorurl = `${this.url}/rooms/${buildingID}/${level}`
      return this.http.get<room[]>(floorurl).pipe(
        tap((floor)=> EndserviceService.log('got floors')),
        catchError(this.handleError<room[]>('could not get floor'))
      )
  }

  getFloors(buildingID:string|null):Observable<floors[]>{
    const floorsUrl = `${this.url}/floors/${buildingID}`
    return this.http.get<floors[]>(floorsUrl).pipe(
      tap(_=> console.log('Got floors')),
      catchError(this.handleError<floors[]>('could not get floors'))
    )
  }

  postChecklist(buildingID:string|null,room:room,mouseFound:number):Observable<room[]>{
    const checklisturl = `${this.url}/checklist/${buildingID}/room`
    let data={
      room:room,
      mice:mouseFound
    }
    return this.http.post<room[]>(checklisturl,data).pipe(
      tap(_=>(console.log("submited room"))),
      catchError(this.handleError<room[]>("room info was not submitted"))
    )
  }

  getDash():Observable<Dashboard>{
    const dashurl = `${this.url}/dashboard`
    return this.http.get<Dashboard>(dashurl).pipe(
      tap(_=>"got dash"),
      catchError(this.handleError<Dashboard>('could not get dash'))
    )
  }

  getTable(buildingID:string):Observable<Table[]>{
    const tableurl = `${this.url}/table/${buildingID}`
    return this.http.get<Table[]>(tableurl).pipe(
      tap(_=> console.log('got table')),
      catchError(this.handleError<Table[]>('cannot find table'))
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

