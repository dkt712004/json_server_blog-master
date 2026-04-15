import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../service/blog.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.css'
})
export class BlogList implements OnInit {

  public products: any[] = [];
  public totalRecords: number = 0;
  public totalPages: number = 0;
  public currentPage: number = 1;
  public navigationPages: number[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    // Khi vừa vào trang, mặc định tải dữ liệu trang 1
    this.loadData(1);
  }

  loadData(page: number = 1) {
    this.currentPage = page;

    this.blogService.getList(page).subscribe({
      next: (res: any) => {
        this.products = res.list;

        this.totalRecords = res.totalRecords;
        this.totalPages = res.totalPages;
        this.navigationPages = res.navigationPages;

        console.log('Dữ liệu phân trang:', res);
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách sản phẩm từ Java:', err);
      }
    });
  }

  onDelete(code: string) {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {

      this.blogService.delete(code).subscribe({
        next: () => {
          alert('Đã xóa thành công (Xóa mềm)!');
          this.loadData();
        },
        error: (err) => console.error(err)
      });
    }
  }
}
