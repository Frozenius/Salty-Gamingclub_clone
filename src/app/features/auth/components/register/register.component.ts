import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import Validation from '@core/validation/validation';
import { Router } from '@angular/router';
import { AppComponent } from '../../../../app.component';

@Component({
  selector: 'sgc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  register: FormGroup;
  submitted = false;
  public nutzung = false;
  public privacy = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, public app: AppComponent) {
    this.register = new FormGroup(
      {
        username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        vorname: new FormControl('', []),
        nachname: new FormControl('', []),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]),
        password2: new FormControl('', Validators.required),
        acceptPrivacy: new FormControl(false, [Validators.requiredTrue]),
      },
      {
        validators: Validation.match('password', 'password2'),
      }
    );
  }

  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.register.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.register.invalid) {
      return;
    }

    this.auth.register(this.register.value).catch((error) => {
      console.error(error);
    });
  }

  ngOnDestroy(): void {}
}
