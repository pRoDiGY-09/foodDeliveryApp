import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true, 
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  profilePicture: File | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        terms: [false, Validators.requiredTrue]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.profilePicture = file;
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = new FormData();
      formData.append('fullName', this.signupForm.value.fullName);
      formData.append('email', this.signupForm.value.email);
      formData.append('phone', this.signupForm.value.phone);
      formData.append('password', this.signupForm.value.password);
      if (this.profilePicture) {
        formData.append('profilePicture', this.profilePicture);
      }

      this.authService.signup(formData).subscribe({
        next: (res) => {
          alert('Signup successful!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Signup failed:', err);
          alert('Signup failed, please try again.');
        }
      });
    }
  }
}