import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndserviceService } from 'src/app/services/endservice.service';

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
  loading:boolean
  success:boolean
  message!:String
  constructor(private fb:FormBuilder, private service:EndserviceService) {
    this.role = ["Admin","User"]
    this.signupForm = this.createForm()
    this.submitted = false
    this.invalid= false
    this.loading= false
    this.success= false

   }

  ngOnInit(): void {
  }

  createForm():FormGroup{
    return this.fb.group({
      userName:['', Validators.required],
      password:['', Validators.required],
      Role:['', Validators.required]
    })

  }
  get f(){
    return this.signupForm.controls
  }

  createUser(){
    this.submitted = true
    if(this.signupForm.invalid){
      return
    }
    this.service.createUser(this.signupForm.value['userName'],this.signupForm.value['password'], this.signupForm.value['Role']).subscribe({
      next:(res)=> {this.message = `created user ${res.userName} as ${res.Role}`; this.success = true},
      error:()=> {this.message = `could not create user ${this.signupForm.value["userName"]} as ${this.signupForm.value["Role"]}. Try another user name`}
    })
  }


}
