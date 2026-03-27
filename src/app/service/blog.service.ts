import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// đánh dấu là service, root => service duy nhất
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:3000/blogs';

  // tiêm sự phụ thuộc bằng constructor
  constructor(private http: HttpClient) { }

  getList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDetail(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  searchBlogs(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?title_like=${term}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
