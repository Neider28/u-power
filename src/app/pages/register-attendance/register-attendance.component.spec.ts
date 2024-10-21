import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAttendanceComponent } from './register-attendance.component';

describe('RegisterAttendanceComponent', () => {
  let component: RegisterAttendanceComponent;
  let fixture: ComponentFixture<RegisterAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAttendanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
