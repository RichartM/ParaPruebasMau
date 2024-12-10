import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiProfesorService } from '../service/api-profesor.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-profesor',
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-profesor.component.html',
  styleUrls: ['./crear-profesor.component.css'],
  standalone: true
})
export class CrearProfesorComponent {

  nuevoDocente: any = {
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    correo: '',
    password: '',
    sexo: '',
    estado: true,
    grupos: {
      id_grupo: 0
    },
    materias: {
      idMateria: 0
    }
  };

  constructor(private apiService: ApiProfesorService, private router: Router) {}

  ngOnInit(): void {
    if (!this.apiService.isAuthenticated()) {
      console.log('Sesión no iniciada. Redirigiendo al login...');
      this.router.navigate(['/login']);
      return;
    } else {
      console.log('Sesión iniciada correctamente.');
    }
  }

  registrarProfesor(): void {
    console.log('Datos del grupo a enviar:', this.nuevoDocente);
    this.apiService.registrarDocente(this.nuevoDocente).subscribe({
      next: (response) => {
        console.log('Grupo registrado con éxito:', response);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Profesor registrado correctamente',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (error) => {
        console.error('Error al registrar el grupo:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al registrar al profesor',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
  procesarImagen(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const trimmedBase64 = base64.substring(base64.indexOf(',') + 1);
        console.log('Base64 recortado:', trimmedBase64);
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No se seleccionó ningún archivo');
    }
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario');
    this.apiService.setUsuarioActual(null);
    console.log('Sesión cerrada');
    this.router.navigate(['/login']);
  }
}
