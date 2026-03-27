import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './components/app-header/app-header';
import { AppMenuComponent } from './components/app-menu/app-menu';
import { AppFooterComponent } from './components/app-footer/app-footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppHeaderComponent, AppMenuComponent, AppFooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'angular-blog-management';
}
