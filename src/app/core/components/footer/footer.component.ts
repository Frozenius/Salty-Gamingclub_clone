import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sgc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  privacy: any;
  impressum: any;
  nutzung: any;

  constructor() {}

  ngOnInit(): void {}
}
