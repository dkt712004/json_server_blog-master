import { Routes } from '@angular/router';

// 1. Import Guard bảo vệ đường dẫn
import { authGuard } from './auth.guard';

// 2. Import các Component quản lý Sản phẩm (Blogs)
import { BlogList } from './components/blog-list/blog-list';
import { BlogCreateEdit } from './components/blog-create-edit/blog-create-edit';
import { BlogSearchComponent } from './components/blog-search/blog-search';

// 3. Import các Component quản lý Đơn hàng (Orders)
import { OrderList } from './components/order-list/order-list';
import { OrderDetailComponent } from './components/order-detail/order-detail';

export const routes: Routes = [
  // Trang mặc định: Tự động chuyển về danh sách sản phẩm
  { path: '', redirectTo: 'blogs', pathMatch: 'full' },

  // --- CÁC ĐƯỜNG DẪN ĐƯỢC BẢO VỆ BỞI AUTH GUARD ---
  // Chỉ những ai đã đăng nhập tài khoản Manager mới vào được các trang này

  {
    path: 'blogs',
    component: BlogList,
    canActivate: [authGuard]
  },
  {
    path: 'blogs/new',
    component: BlogCreateEdit,
    canActivate: [authGuard]
  },
  {
    path: 'blogs/edit/:code',
    component: BlogCreateEdit,
    canActivate: [authGuard]
  },
  {
    path: 'blogs/search',
    component: BlogSearchComponent,
    canActivate: [authGuard]
  },
  {
    path: 'orders',
    component: OrderList,
    canActivate: [authGuard]
  },
  {
    path: 'orders/detail/:id',
    component: OrderDetailComponent,
    canActivate: [authGuard]
  },

  // Trang bắt lỗi 404 nếu người dùng nhập tầm bậy (Tùy chọn)
  { path: '**', redirectTo: 'blogs' }
];
