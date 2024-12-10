import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';  // Importa SweetAlert2

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  correo: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  iniciarSesion(): void {
    this.apiService.authenticate(this.correo, this.password).subscribe(
      (response) => {
        console.log('Usuario autenticado:', response);

        if (response && response.token) {
          sessionStorage.setItem('usuario', JSON.stringify(response));

          const rol = response.rol;
          if (rol === 'Administrador') {
            this.router.navigate(['/admin']);
          } else if (rol === 'Docente') {
            this.router.navigate(['/docente']);
          } else {
            this.router.navigate(['/home']);
          }

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Credenciales incorrectas',
            confirmButtonText: 'Intentar nuevamente'
          });
        }
      },
      (error) => {
        console.error('Error al autenticar:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'Hubo un problema al intentar iniciar sesión. Intenta nuevamente más tarde.',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }
}
