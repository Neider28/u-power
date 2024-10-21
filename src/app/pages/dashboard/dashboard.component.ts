import { Component } from '@angular/core';
import { MenuWrapComponent } from '../../components/menu-wrap/menu-wrap.component';
import { RouterOutlet } from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuWrapComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem("access_token");

    if (token) {
      const info: any = jwtDecode.jwtDecode(token);

      if (info && info?.role === 'admin') {
        this.router.navigate(['/admin']);
      }
    }
  }
}
