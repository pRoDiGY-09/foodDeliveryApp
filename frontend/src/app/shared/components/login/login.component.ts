import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      console.log("Form Submitted", this.loginForm.value);
      
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          alert('Login successful');
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Invalid credentials');
        }
      });
    } else {
      console.log("Form is invalid"); // Debugging purpose
    }
  }
}