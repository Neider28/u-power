import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAdminWrapComponent } from './menu-admin-wrap.component';

describe('MenuAdminWrapComponent', () => {
  let component: MenuAdminWrapComponent;
  let fixture: ComponentFixture<MenuAdminWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuAdminWrapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuAdminWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
