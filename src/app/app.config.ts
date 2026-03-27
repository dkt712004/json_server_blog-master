import { ApplicationConfig } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router'; // Thêm withRouterConfig
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({ onSameUrlNavigation: 'reload' })
    ),
    provideHttpClient()
  ]
};
