import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup
  role:String[]
  submitted:boolean
  invalid:boolean
  constructor(private fb:FormBuilder) {
    this.role = ["Admin","User"]
    this.signupForm = this.createForm()
    this.submitted = false
    this.invalid= false
   }

  ngOnInit(): void {
  }

  createForm():FormGroup{
    return this.fb.group({
      userName:['', Validators.required],
      Role:['', Validators.required],
      password:['', Validators.required]
    })

  }
  get f(){
    return this.signupForm.controls
  }

  createUser(){

  }


}
