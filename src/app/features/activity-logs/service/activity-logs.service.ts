import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogsService {

  private api =
    'https://backend-tasks-api.onrender.com/api/v1/activity-logs';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // ✔ SOLO LISTAR (lo que sí existe)
  getAll() {
    return this.http.get<any[]>(this.api, this.getHeaders());
  }
}