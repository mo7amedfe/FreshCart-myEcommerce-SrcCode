import { NavbarComponent } from './../navbar/navbar.component';
import { AuthService } from './../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  errMessage: string = '';
  isLoading: boolean = false;

  constructor(private _AuthService: AuthService, private _Router: Router) {
    
  }


  loginGroup = new FormGroup(

    {

      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)])

    }

  )

  signin(data: FormGroup) {

    this.isLoading = true

    this._AuthService.login(data.value).subscribe({

      next: (res) => {

        console.log(res);

        if (res.message == 'success') {

          localStorage.setItem('eCommerce', res.token);
          this._AuthService.userData()
        }

      },

      error: (err) => {

        console.log(err);
        this.isLoading = false;
        this.errMessage = err.error.message;

      },

      complete: () => {

        this.isLoading = true;
        this._AuthService.userData();
        this._Router.navigate(['/home'])

      }
    })
  }
}