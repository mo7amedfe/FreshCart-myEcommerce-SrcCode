import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CustomValidators } from '../custom-validators.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  isLoading: boolean = false
  errMessage: string = '';



  constructor(private _AuthService: AuthService, private _Router: Router) { }

  registerForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
    Phone: new FormControl(null, [Validators.required, Validators.pattern(/^(002)?01[0125][0-9]{8}$/)])
  }, { validators: this.matchPassword });

  matchPassword(form: any) {
    let pass = form.get('password')
    let rePass = form.get('rePassword')
    if (pass.value === rePass.value) {
      return null
    } else {
      return form.get('rePassword').setErrors({ match: " not matched" })
    }
  }

  



  register(data: FormGroup) {

    this.isLoading = true

    this._AuthService.register(data.value).subscribe({
      next: (res) => {
        if (res.message == 'success') {
          this._Router.navigate(['/signin'])
        }
      },
      error: (err) => {
        this.isLoading = false

        console.log(err);

        this.errMessage = err.error.message;

      },
      complete: () => {
        this.isLoading = false;

      }
    }
    )



  }

}
