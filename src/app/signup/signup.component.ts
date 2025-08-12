import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,FormBuilder} from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmedValidator } from '../confirm-password.validator';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

 signupForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private http:HttpClient,
    private router:Router,
    private dialog:MatDialog,
  
   ) { 
    this.signupForm = this.formBuilder.group({
      name: new FormControl('',[Validators.required, Validators.pattern('^[A-Za-z ]+$')]),
      addresss: new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      number: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      password:new FormControl('',[Validators.required,Validators.minLength(8), Validators.maxLength(15)]),
      confirmPassword: ['', [Validators.required]]
}, {
  validator:ConfirmedValidator('password', 'confirmPassword')
});
    
  }

  ngOnInit(): void {
  }

showPassword: boolean = false;
showConfirmPassword: boolean = false;

get username(){
  return this.signupForm.get('name');
}
get addresss(){
  return this.signupForm.get('addresss');
}


get useremail(){
  return this.signupForm.get('email');
}

get usernumber(){
  return this.signupForm.get('number');
}

get userpassword(){
  return this.signupForm.get('password');
}
get f() { return this.signupForm.controls; }

alertMessage = '';
alertType: 'success' | 'danger' | 'warning' | 'info' = 'success';

signFormSubmit() {
  this.http.post<any>('https://localhost:7174/api/Register', this.signupForm.value).subscribe({
    next: res => {
      // alert('Registered Successfully');
       this.showAlert('Registered Successfully.', 'success');
      this.signupForm.reset();
      this.dialog.closeAll();
    },
    error: err => {
      if (err.status === 409) {
          this.showAlert('Email already exists. Please use a different one.', 'danger');
      } else if (err.error && err.error.errors) {
        alert("Validation error:\n" + JSON.stringify(err.error.errors, null, 2));
      } else {
        this.showAlert('Something went wrong. Please try again.', 'danger');
      }
    }
  });
}

showAlert(message: string, type: 'success' | 'danger' | 'warning' | 'info') {
  this.alertMessage = message;
  this.alertType = type;
}

togglePasswordVisibility(field: string): void {
  if (field === 'password') {
    this.showPassword = !this.showPassword;
  } else if (field === 'confirm') {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}

}



