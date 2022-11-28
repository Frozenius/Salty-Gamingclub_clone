import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sgc-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  reset: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.reset = new FormGroup({
      email: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.reset.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.reset.invalid) {
      return;
    }

    this.auth.resetPassword(this.reset.value.email).catch((error) => {
      console.error(error);
    });
  }
}
