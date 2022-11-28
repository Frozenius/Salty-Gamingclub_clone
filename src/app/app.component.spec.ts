import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from '@core/services/auth.service';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ServerOptionsComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [AppComponent, { provide: AuthService, useClass: MockAuthService }, MessageService, HttpClient, HttpHandler],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockAuthService {}
