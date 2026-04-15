import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css'
})
export class OrderList implements OnInit {
  public orders: any[] = [];
  public totalRecords: number = 0;
  public totalPages: number = 0;
  public currentPage: number = 1;
  public navigationPages: number[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders(1);
  }

  loadOrders(page: number) {
    this.currentPage = page;
    this.orderService.getOrders(page).subscribe({
      next: (res: any) => {
        // Gán dữ liệu từ cục PaginationResult của Java vào các biến Angular
        this.orders = res.list;
        this.totalRecords = res.totalRecords; // Gán giá trị để hiện lên dòng 7 HTML
        this.totalPages = res.totalPages;
        this.navigationPages = res.navigationPages;
      },
      error: (err) => console.error('Lỗi kết nối Java:', err)
    });
  }

  changeStatus(orderId: number, status: string) {
    this.orderService.updateStatus(orderId, status).subscribe({
      next: () => {
        alert('Cập nhật trạng thái thành công!');
        this.loadOrders(this.currentPage);
      },
      error: (err) => alert('Lỗi: ' + err.message)
    });
  }

  viewDetail(orderId: number) {
    this.router.navigate(['/orders/detail', orderId]);
  }
}
