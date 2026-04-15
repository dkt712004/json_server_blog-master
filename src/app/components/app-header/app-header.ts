import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Bỏ RouterLinkActive ở đây

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css'
})
export class AppHeaderComponent {
  onLogout(): void {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      window.location.href = 'http://localhost:8081/admin/logout';
    }
  }
}
