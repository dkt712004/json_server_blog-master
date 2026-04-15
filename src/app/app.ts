import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// 1. Import chính xác các Component con đã tạo
import { AppHeaderComponent } from './components/app-header/app-header';
import { AppMenuComponent } from './components/app-menu/app-menu';
import { AppFooterComponent } from './components/app-footer/app-footer';

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. Mảng imports này là CHÌA KHÓA để hết lỗi đỏ trong HTML
  imports: [
    CommonModule,
    RouterOutlet,       // Để dùng được thẻ <router-outlet>
    AppHeaderComponent, // Để dùng được thẻ <app-header>
    AppMenuComponent,   // Để dùng được thẻ <app-menu>
    AppFooterComponent  // Để dùng được thẻ <app-footer>
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'Dkt Shop Management';
}
