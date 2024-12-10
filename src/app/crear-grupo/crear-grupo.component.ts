import { Component } from '@angular/core';
import { ApiGruposService } from '../service/api-grupos.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-crear-grupo',
  imports: [CommonModule, FormsModule], 
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.css'], 
  standalone: true
})
export class CrearGrupoComponent {

  nuevoGrupo: any = { 
    grado: 0,
    grupo: '',
    carrera: '',
    estado: true
  };

  constructor(private apiService: ApiGruposService, private router: Router) {}

  ngOnInit(): void {
    if (!this.apiService.isAuthenticated()) {
      console.log('Sesión no iniciada. Redirigiendo al login...');
      this.router.navigate(['/login']);
      return;
    } else {
      console.log('Sesión iniciada correctamente.');
    }
  }

  registrarGrupo(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se registrará el grupo con los datos proporcionados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Datos del grupo a enviar:', this.nuevoGrupo);
        this.apiService.registrarGrupo(this.nuevoGrupo).subscribe({
          next: (response) => {
            console.log('Grupo registrado con éxito:', response);
            Swal.fire({
              title: '¡Éxito!',
              text: 'Grupo registrado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.router.navigate(['/grupos']);
            });
          },
          error: (error) => {
            console.error('Error al registrar el grupo:', error);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo registrar el grupo. Inténtalo nuevamente.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
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
