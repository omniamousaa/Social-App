import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService)
  private readonly router =inject(Router)

  loginErrorMessage:WritableSignal<string> = signal('')
  loginsuccessMessage:WritableSignal<string> = signal('')

  isLoding=signal(false)

  loginForm = new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email]),
  password : new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)])
  } ,
  {
    updateOn:'submit'
  })

  submitlogin(){
      if(this.loginForm.valid){
    console.log(this.loginForm.value);
    this.isLoding.set(true)
    // subscribe api
  this.authService.login(this.loginForm.value).subscribe({
    next: (res) => {
      console.error(res);
      if (res.success) {
        localStorage.setItem('socialToken' ,res.data.token )
        localStorage.setItem('socialUser' ,JSON.stringify(res.data.user))
      this.loginErrorMessage.set('')
      this.loginsuccessMessage.set(res.message)
        setTimeout(() => {
          this.router.navigate(['/feed'])
        }, 1000);
      }
    },
    error: (err) => {
      this.loginErrorMessage.set(err.error.message)
      this.isLoding.set(false)
    },
    complete: () => {
      this.isLoding.set(false)
    }
  });
  }
  else{
    this.loginForm.markAllAsTouched()
  }
  }

  togglePassword(passwordElement:any){
    if(passwordElement.type === 'password'){
      passwordElement.type = 'text'
      console.log("o");
    }else{
      passwordElement.type = 'password'
    }
  }
}
