import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, Subject, tap } from 'rxjs';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userUrl: string
  currentUser!: Subject<User | null>
  loggedIn!: BehaviorSubject<boolean>

  constructor(private http: HttpClient) {
    this.userUrl = "http://localhost:3000/user"
    this.currentUser= new Subject<User|null>()
    this.loggedIn = new BehaviorSubject<boolean>(false)
    this.verifyUser().subscribe({
      next: () => this.loggedIn.next(true),
      error: () => this.loggedIn.next(false)
    }
    )
  }

  getAuthUser():Observable<User|null>{
    return this.currentUser.asObservable()
  }


  loginUser(userName: string, password: string): BehaviorSubject<boolean> {
    const loginUrl = `${this.userUrl}/login`
    const userJson = { userName: userName, Password: password }
    this.http.post<User>(loginUrl, userJson, { withCredentials: true }).subscribe(
      {
        next:(res)=>{
          this.loggedIn.next(true)
          this.currentUser.next(res)
        },
        error:()=>{ this.loggedIn.next(false)
          this.currentUser.next(null)
        }

      }
    )
    return this.loggedIn
  }

  verifyUser() {
    const verifyUrl = `${this.userUrl}/verify`
    console.log(verifyUrl)
    return this.http.get<boolean>(verifyUrl, { withCredentials: true })
  }

  logout() {
    const logoutUrl = `${this.userUrl}/logout`
    this.http.get<boolean>(logoutUrl,{withCredentials:true}).subscribe(
      {next:(res)=> this.loggedIn.next(res),
        error:()=> {console.log("couldnot logout")
          this.loggedIn.next(true)
        }
      }
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      AuthService.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private static log(message: string) {
    console.log(message);
  }
}

