import { Directive, Host } from '@angular/core';
import { NgForOf } from '@angular/common';

@Directive({
  selector: '[ngForTrackById]',
})
export class TrackByIdDirective<T extends Item> {
  constructor(@Host() private readonly ngFor: NgForOf<T>) {
    this.ngFor.ngForTrackBy = (index: number, item: T) => item.id;
  }
}

interface Item {
  id: number;
}
