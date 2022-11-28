import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  submitted = false;
  public nutzung = false;
  public privacy = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, public app: AppComponent) {
    this.login = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      rememberMe: new FormControl(''),
    });
  }

  ngOnInit() {}

  signInWithProvider(provider: string) {
    this.auth.signInWithProvider(provider);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.login.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.login.invalid) {
      return;
    }

    this.auth.login(this.login.value.email, this.login.value.password, this.login.value.rememberMe).catch((error) => {
      console.error(error);
    });
  }
}
