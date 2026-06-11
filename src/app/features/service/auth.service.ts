import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private authUrl =
    'https://backend-tasks-api.onrender.com/api/v1/auth';

  private usersUrl =
    'https://backend-tasks-api.onrender.com/api/v1/users';

  // 🔐 LOGIN
  login(data: any) {
    return this.http.post(
      `${this.authUrl}/login`,
      data
    );
  }

  // 📝 REGISTER
  register(data: any) {
    return this.http.post(
      `${this.usersUrl}/register`,
      data
    );
  }

  // 💾 GUARDAR TOKEN
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // 🔍 OBTENER TOKEN
  getToken() {
    return localStorage.getItem('token');
  }

  // 🚪 LOGOUT
  logout() {
    localStorage.removeItem('token');
  }

  // 🔐 HEADERS OPCIONAL (si luego quieres reutilizarlo)
  getAuthHeaders() {
    const token = this.getToken();

    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }
}