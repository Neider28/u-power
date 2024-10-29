import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuAdminWrapComponent } from '../../components/menu-admin-wrap/menu-admin-wrap.component';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MenuAdminWrapComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  private userService = inject(UserService);

  ngOnInit(): void {
    this.userService.loadUserProfile();
  }
}
