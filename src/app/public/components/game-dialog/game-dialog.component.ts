import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sgc-game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.scss'],
})
export class GameDialogComponent implements OnInit {
  @Input() game: any;
  constructor() {}

  ngOnInit(): void {}
}
