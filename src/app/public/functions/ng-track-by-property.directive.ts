import { Directive, Host, Input } from '@angular/core';
import { NgForOf } from '@angular/common';

@Directive({
  selector: '[ngForTrackByProperty]',
})
export class TrackByPropertyDirective {
  private property: string;

  constructor(@Host() private readonly ngFor: NgForOf<any>) {
    this.ngFor.ngForTrackBy = (index: number, item: any) => (this.property ? item[this.property] : item);
  }

  @Input('ngForTrackByProperty')
  public set propertyName(value: string | null) {
    this.property = value ?? '';
  }
}
