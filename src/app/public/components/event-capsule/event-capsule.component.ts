import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sgc-event-capsule',
  templateUrl: './event-capsule.component.html',
  styleUrls: ['./event-capsule.component.scss'],
})
export class EventCapsuleComponent implements OnInit {
  @Input() name = '';
  @Input() wann = '';
  @Input() was = '';
  @Input() wo = '';
  @Input() wer = '';

  constructor() {}

  ngOnInit(): void {}
}
