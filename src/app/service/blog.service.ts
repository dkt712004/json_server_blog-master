import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private apiUrl = 'http://localhost:8081/api/products';

  constructor(private http: HttpClient) { }

  getList(page: number = 1, name: string = ''): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('name', name);
    return this.http.get<any>(this.apiUrl, { params, withCredentials: true });
  }

  getDetail(code: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${code}`, { withCredentials: true });
  }

  save(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData, { withCredentials: true });
  }

  delete(code: string): Observable<any> {
    const url = `${this.apiUrl}/${code.trim()}`;
    return this.http.delete<any>(url, { withCredentials: true });
  }
}
