import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  isLogin = true;

  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  // 🔐 LOGIN
  login() {

    if (!this.loginData.email || !this.loginData.password) {
      alert('Completa todos los campos');
      return;
    }

    this.authService.login(this.loginData as any)
      .subscribe({
        next: (response: any) => {

          console.log('LOGIN RESPONSE:', response);

          const token =
            response?.token ||
            response?.accessToken ||
            response?.data?.token;

          if (!token) {
            alert('No se recibió token');
            return;
          }

          this.authService.saveToken(token);

          // 🚀 CAMBIO IMPORTANTE: ahora entra al DASHBOARD
          this.router.navigate(['/dashboard/tasks']);
        },

        error: (error: any) => {
          console.error('LOGIN ERROR:', error);
          alert('Error en login');
        }
      });

  }

  // 📝 REGISTER
  register() {

    if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password ||
      !this.registerData.confirmPassword
    ) {
      alert('Completa todos los campos');
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const body = {
      name: this.registerData.name,
      email: this.registerData.email,
      password: this.registerData.password
    };

    this.authService.register(body)
      .subscribe({
        next: () => {
          alert('Cuenta creada correctamente');
          this.isLogin = true;
        },

        error: (error: any) => {
          console.error(error);
          alert('Error creando usuario');
        }
      });

  }

}