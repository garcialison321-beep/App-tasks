import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../service/auth.service'; // ajusta si ruta cambia

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private apiUrl =
    'https://backend-tasks-api.onrender.com/api/v1/tasks';

  private getHeaders() {
    const token = this.authService.getToken();

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // 📌 GET
  getTasks() {
    return this.http.get<any[]>(this.apiUrl, this.getHeaders());
  }

  // 📌 CREATE (ESTO ERA EL PROBLEMA)
  createTask(data: any) {
    return this.http.post(this.apiUrl, data, this.getHeaders());
  }

  // 📌 UPDATE
  updateTask(id: string, data: any) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      data,
      this.getHeaders()
    );
  }

  // 📌 DELETE
  deleteTask(id: string) {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    );
  }
}