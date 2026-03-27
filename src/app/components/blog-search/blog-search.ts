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
  listBlogs: any[] = [];
  searchTerm: string = '';
  positionMap: any = { 1: 'Việt Nam', 2: 'Châu Á', 3: 'Châu Âu', 4: 'Châu Mỹ' };

  constructor(private blogService: BlogService) {}

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.blogService.searchBlogs(this.searchTerm).subscribe((res: any) => {
        this.listBlogs = res;
      });
    }
  }

  onDelete(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này ngay tại trang tìm kiếm?')) {
      this.blogService.delete(id).subscribe(() => {
        alert('Xóa thành công!');
        this.onSearch();
      });
    }
  }

  getPositionNames(posIds: any): string {
    if (!posIds || !Array.isArray(posIds)) return '';
    return posIds.map(id => this.positionMap[id]).filter(n => !!n).join(', ');
  }
}
