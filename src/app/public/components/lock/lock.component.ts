import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sgc-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.scss'],
})
export class LockComponent implements OnInit {
  @Input() label: string;

  constructor() {}

  ngOnInit(): void {}
}
