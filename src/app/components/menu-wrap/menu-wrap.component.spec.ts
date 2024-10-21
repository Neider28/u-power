import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWrapComponent } from './menu-wrap.component';

describe('MenuWrapComponent', () => {
  let component: MenuWrapComponent;
  let fixture: ComponentFixture<MenuWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuWrapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
