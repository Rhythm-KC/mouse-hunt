import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  Admin:string
  loggedIn!:boolean
  currentUser!:User|null
  constructor(private auth:AuthService, private router:Router) {
    this.Admin ="Admin"
    this.auth.getLoginStatus().subscribe(
      res=>{this.loggedIn = res
        console.log(res)
      }

    )
   }

  ngOnInit(): void {

  }
  logout(){
    this.auth.logout()
    this.router.navigate(["/login"])
  }

}
