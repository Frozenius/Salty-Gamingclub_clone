import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlanerComponent } from './event-planer.component';

describe('EventPlanerComponent', () => {
  let component: EventPlanerComponent;
  let fixture: ComponentFixture<EventPlanerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventPlanerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPlanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
