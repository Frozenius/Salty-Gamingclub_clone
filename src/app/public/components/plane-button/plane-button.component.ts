import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sgc-plane-button',
  templateUrl: './plane-button.component.html',
  styleUrls: ['./plane-button.component.scss'],
})
export class PlaneButtonComponent implements OnInit {
  @Input() label: string;
  @Input() onClick: () => void;
  @Input() disabled: boolean;

  constructor() {}

  ngOnInit(): void {}
}
