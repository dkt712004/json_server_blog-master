import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../service/blog.service';

@Component({
  selector: 'app-blog-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './blog-search.html'
})
export class BlogSearchComponent {
  public listBlogs: any[] = [];
  public searchTerm: string = '';

  constructor(private blogService: BlogService) {}

  getPositionNames(pos: any): string {
    const positionMap: any = {
      1: 'Việt Nam', 2: 'Châu Á', 3: 'Châu Âu', 4: 'Châu Mỹ'
    };
    return positionMap[pos] || 'N/A';
  }

  onSearch(): void {
    if (this.searchTerm.trim() !== '') {
      this.blogService.getList(1, this.searchTerm).subscribe((res: any) => {
        this.listBlogs = res.list;
      });
    } else {
      this.listBlogs = [];
    }
  }

  onDelete(code: string): void {
    if (confirm('Xóa sản phẩm này?')) {
      this.blogService.delete(code).subscribe(() => {
        this.listBlogs = this.listBlogs.filter(blog => blog.code !== code);
        alert('Đã xóa thành công!');
      });
    }
  }
}
