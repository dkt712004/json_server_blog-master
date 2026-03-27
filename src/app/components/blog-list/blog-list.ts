import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { BlogService } from '../../service/blog.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.css'
})
export class BlogListComponent implements OnInit {
  listBlogs: any[] = [];
  positionMap: any = { 1: 'Việt Nam', 2: 'Châu Á', 3: 'Châu Âu', 4: 'Châu Mỹ' };

  constructor(private blogService: BlogService, private router: Router) {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.fetchData();
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.blogService.getList().subscribe((res: any) => {
      this.listBlogs = res;
    });
  }

  onDelete(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      this.blogService.delete(id).subscribe({
        next: () => {
          this.listBlogs = this.listBlogs.filter(blog => blog.id !== id);

          alert('Xóa thành công!');
        },
        error: (err: any) => {
          alert('Lỗi khi xóa: ' + err.message);
        }
      });
    }
  }

  getPositionNames(posIds: any): string {
    if (!posIds || !Array.isArray(posIds)) return '';
    return posIds.map(id => this.positionMap[id]).filter(n => !!n).join(', ');
  }
}
