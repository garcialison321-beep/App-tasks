import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Notification } from '../models/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private api =
    'https://backend-tasks-api.onrender.com/api/v1/notifications';

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
    return this.http.get<Notification[]>(
      this.api,
      this.getHeaders()
    );
  }

  markAsRead(id: string) {
    return this.http.put(
      `${this.api}/${id}`,
      { read: true },
      this.getHeaders()
    );
  }

  delete(id: string) {
    return this.http.delete(
      `${this.api}/${id}`,
      this.getHeaders()
    );
  }
}