import { Component } from '@angular/core';
import { ApiGruposService } from '../service/api-grupos.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-grupos',
  imports: [CommonModule, FormsModule],
  templateUrl: './mostrar-grupos.component.html',
  styleUrls: ['./mostrar-grupos.component.css'],
  standalone: true
})
export class MostrarGruposComponent {
  grupos: any[] = [];
  usuarioActual: any;
  grupoActual: any = {}; 
  modoEdicion: boolean = false;

  constructor(private apiService: ApiGruposService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.authenticate('root', 'root123').subscribe(
      (response) => {
        console.log('Respuesta del servidor de autenticación:', response);
        this.apiService.setCredentials('root', 'root123');
        this.llenarData(); 
      },
      (error) => {
        console.error('Error de autenticación:', error);
        this.router.navigate(['/login']);
      }
    );

    if (!this.apiService.isAuthenticated()) {
      console.log('Sesión no iniciada. Redirigiendo al login...');
      this.router.navigate(['/login']);
      return;
    } else {
      console.log('Sesión iniciada');
      this.usuarioActual = this.apiService.getUsuarioActual();
      console.log('Datos del usuario actual:', this.usuarioActual);
    }
  }

  llenarData(): void {
    this.apiService.getData().subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        if (response && response.grupoResponse && response.grupoResponse.grupos) {
          this.grupos = response.grupoResponse.grupos;
          console.log('Grupos cargados:', this.grupos);
        } else {
          console.warn('Estructura de respuesta inesperada:', response);
        }
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
        this.router.navigate(['/login']);
      }
    );
  }

  seleccionarGrupo(grupo: any): void {
    this.grupoActual = { ...grupo };
    this.modoEdicion = true;
    console.log('Grupo seleccionado para edición:', this.grupoActual);
  }

  guardarCambios(): void {
    if (this.grupoActual && this.grupoActual.id_grupo) {
      const id = this.grupoActual.id_grupo;
      this.apiService.actualizarGrupo(id, this.grupoActual).subscribe(
        (response) => {
          console.log('Grupo actualizado con éxito:', response);
          const index = this.grupos.findIndex((g) => g.id_grupo === id);
          if (index !== -1) {
            this.grupos[index] = { ...this.grupoActual };
          }
          Swal.fire({
            title: '¡Éxito!',
            text: '¡Cambios guardados con éxito!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.modoEdicion = false;
        },
        (error) => {
          console.error('Error al actualizar el grupo:', error);
          if (error.status === 404) {
            Swal.fire({
              title: 'Error',
              text: 'El grupo no se encontró. Intente nuevamente.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Error al guardar los cambios. Intente nuevamente.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        }
      );
    } else {
      console.warn('No hay grupo seleccionado o faltan datos');
      Swal.fire({
        title: 'Advertencia',
        text: 'Por favor, complete todos los campos antes de guardar.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  cancelarEdicion(): void {
    this.grupoActual = {}; 
    this.modoEdicion = false;
    console.log('Edición cancelada');
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario');
    this.apiService.setUsuarioActual(null);
    console.log('Sesión cerrada');
    this.router.navigate(['/login']);
  }
}
