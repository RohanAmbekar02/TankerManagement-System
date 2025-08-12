import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm :FormGroup;

 constructor(private fb:FormBuilder,private http:HttpClient,private router:Router) { 
    this.loginForm = this.fb.group({
  email: ['', Validators.required],
  password: ['', Validators.required],
});

  }

 ngOnInit(): void {
  }

  showPassword: boolean = false;

togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}

alertMessage = '';
alertType: 'success' | 'danger' | 'warning' | 'info' = 'success';

login() {
  const loginData = {
    email: this.loginForm.value.email,
    password: this.loginForm.value.password
  };

  this.http.post<any>('https://localhost:7174/api/Register/login', loginData).subscribe({
    next: res => {
     this.showAlert('Login Successfully!', 'success');
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigate(['/dashboard']);
    },
    error: err => {
      if (err.status === 400 && err.error?.errors) {
        alert('Validation error:\n' + JSON.stringify(err.error.errors, null, 2));
      } else if (err.status === 401) {
       this.showAlert('Invalid email or password','danger');
      } else {
        this.showAlert('Something went wrong.','danger');
        console.error('Login failed:', err);
      }
    }
  });
}
showAlert(message: string, type: 'success' | 'danger' | 'warning' | 'info') {
  this.alertMessage = message;
  this.alertType = type;
}

}

