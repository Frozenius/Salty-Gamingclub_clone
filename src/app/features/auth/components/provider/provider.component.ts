import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sgc-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
})
export class ProviderComponent implements OnInit {
  public nutzung = false;
  public privacy = false;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signInWithGithub() {
    this.auth.signInWithGithub().catch((error) => {
      console.error(error);
    });
  }
}
