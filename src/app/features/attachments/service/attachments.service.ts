import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {

  private api =
    'https://backend-tasks-api.onrender.com/api/v1/attachments';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getAll() {
    return this.http.get<any[]>(this.api, this.getHeaders());
  }

  upload(file: FormData) {
    return this.http.post(this.api, file, this.getHeaders());
  }

  delete(id: string) {
    return this.http.delete(`${this.api}/${id}`, this.getHeaders());
  }
}