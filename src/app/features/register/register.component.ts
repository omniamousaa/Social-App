import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService =inject(AuthService)
  private readonly router =inject(Router)

  registerErrorMessage:WritableSignal<string> = signal('')
  registersuccessMessage:WritableSignal<string> = signal('')

  isLoding=signal(false)

registerForm =new FormGroup({
  name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  username:new FormControl(''),
  email:new FormControl('',[Validators.required,Validators.email]),
  dateOfBirth:new FormControl('',[Validators.required]),
  gender:new FormControl('',[Validators.required]),
  password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)]),
  rePassword:new FormControl('',[Validators.required])
} ,
{
  validators:this.confirmpassword , 
  updateOn:'submit'
})

submitRegister(){
  if(this.registerForm.valid){
    console.log(this.registerForm.value);
    this.isLoding.set(true)
    // subscribe api
  this.authService.register(this.registerForm.value).subscribe({
    next: (res) => {
      console.error(res);
      if (res.success) {
      this.registersuccessMessage.set(res.message)
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 1000);
      }
    },
    error: (err) => {
      this.registerErrorMessage.set(err.error.message)
      this.isLoding.set(false)
    },
    complete: () => {
      this.isLoding.set(false)
    }
  });
  }
  else{
    this.registerForm.markAllAsTouched()
  }
}

confirmpassword(form:AbstractControl){
  const password = form.get('password')?.value
  const rePassword = form.get('rePassword')?.value
  if(password !== rePassword && form.get('rePassword')?.touched){
    form.get('rePassword')?.setErrors({mismatch:true})
    return {mismatch:true}
  }else{
    return null
  }
}
}
