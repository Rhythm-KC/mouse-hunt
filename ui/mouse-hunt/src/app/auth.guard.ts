import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable,of } from 'rxjs';
import { User } from './models/User';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  logIn!:boolean

  user!:User|null
  constructor(private router:Router, private auth:AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.verifyUser().pipe(
        map(res=> {
          if(res && route.data['role'] && route.data["role"] == res.Role){
            this.auth.currentUser.next(res)
            return true
          }
          if(res && !route.data['role']){
            this.auth.currentUser.next(res)
            return true
          }
          return this.router.createUrlTree([''])
        }
      ),
      catchError((error)=>{return of(this.router.createUrlTree(['login']))})
      )

  }

}
