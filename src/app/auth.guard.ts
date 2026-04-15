import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const authApiUrl = 'http://localhost:8081/api/auth/me';

  return http.get<any>(authApiUrl, { withCredentials: true }).pipe(
    map(res => {
      console.log("Check Guard sau khi reload:", res); // Xem dòng này ở F12
      if (res.loggedIn && res.role.includes('ROLE_MANAGER')) {
        return true;
      }

      // 2. Nếu không thỏa mãn -> Chuyển hướng sang trang Login của Java
      console.warn('Truy cập bị từ chối: Chưa đăng nhập hoặc không đủ quyền.');
      window.location.href = 'http://localhost:8081/admin/login';
      return false;
    }),
    catchError((err) => {
      // 3. Nếu lỗi kết nối (Backend Java chưa bật) -> Chuyển hướng sang Login
      console.error('Lỗi kết nối tới Backend Java:', err);
      window.location.href = 'http://localhost:8081/admin/login';
      return of(false);
    })
  ); // Kết thúc pipe và return
};
