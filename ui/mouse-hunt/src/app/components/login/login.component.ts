import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalid:boolean
  submitted:boolean
  loginForm:FormGroup
  constructor(private router:Router, private auth:AuthService, private fb :FormBuilder) {
    this.loginForm= this.buildForm()
    this.invalid = false
    this.submitted = false
  }
  ngOnInit(): void {
    this.loginForm= this.buildForm()
  }


  login(){
    this.submitted=true
    if(this.loginForm.invalid ===true){
      return
    }

    this.auth.loginUser(this.loginForm.value['userName'], this.loginForm.value["Password"]).subscribe(
      {
        next:()=>{
          console.log("redirect home")
          this.router.navigate(["/home"])
        },
        error:()=>{
          this.invalid = true
        }
      }
    )
  }

  get f(){
    return this.loginForm.controls
  }

  buildForm():FormGroup{
    return this.fb.group({
      userName:["", Validators.required],
      Password:["", Validators.required]
    })
  }
}
