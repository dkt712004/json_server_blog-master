import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './app-menu.html',
  styleUrl: './app-menu.css'
})
export class AppMenuComponent {}
