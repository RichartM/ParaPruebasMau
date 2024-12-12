import { Component } from '@angular/core';
import { ApiProfesorService } from '../service/api-profesor.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; // Importar SweetAlert2

@Component({
  selector: 'app-mostrar-profesor',
  imports: [CommonModule, FormsModule],
  templateUrl: './mostrar-profesor.component.html',
  styleUrls: ['./mostrar-profesor.component.css'],
  standalone: true,
})
export class MostrarProfesorComponent {
  docentes: any[] = []; // Lista de docentes
  docenteActual: any = {}; // Docente seleccionado para edición
  modoEdicion: boolean = false; // Modo edición

  constructor(private apiService: ApiProfesorService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.authenticate('root', 'root123').subscribe(
      (response) => {
        console.log('Autenticación exitosa:', response);
        this.apiService.setCredentials('root', 'root123');
        this.llenarData();
      },
      (error) => {
        console.error('Error de autenticación:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'No se pudo autenticar el usuario. Intenta nuevamente.',
        });
        this.router.navigate(['/login']);
      }
    );

    if (!this.apiService.isAuthenticated()) {
      Swal.fire({
        icon: 'warning',
        title: 'Usuario no autenticado',
        text: 'Redirigiendo al login...',
      });
      this.router.navigate(['/login']);
    }
  }

  llenarData(): void {
    this.apiService.getDocentes().subscribe(
      (response) => {
        console.log('Datos recibidos:', response);
        if (response && response.docenteResponse && response.docenteResponse.docentes) {
          this.docentes = response.docenteResponse.docentes;
          
        } else {
          console.warn('Estructura de respuesta inesperada:', response);
          Swal.fire({
            icon: 'warning',
            title: 'Datos incompletos',
            text: 'La estructura de datos recibida no es válida.',
          });
        }
      },
      (error) => {
        console.error('Error al obtener datos de docentes:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar datos',
          text: 'No se pudo cargar la lista de docentes. Intenta más tarde.',
        });
      }
    );
  }

  seleccionarDocente(docente: any): void {
    this.docenteActual = { ...docente };
    this.modoEdicion = true;
    console.log('Docente seleccionado para edición:', this.docenteActual);
    
  }

  guardarCambios(): void {
    if (this.docenteActual && this.docenteActual.id_docente) {
      const id = this.docenteActual.id_docente;
      this.apiService.actualizarDocente(id, this.docenteActual).subscribe(
        (response) => {
          console.log('Docente actualizado con éxito:', response);

          const index = this.docentes.findIndex((d) => d.id_docente === id);
          if (index !== -1) {
            this.docentes[index] = { ...this.docenteActual };
          }

          Swal.fire({
            icon: 'success',
            title: 'Cambios guardados',
            text: '¡El docente ha sido actualizado correctamente!',
          });

          this.modoEdicion = false;
        },
        (error) => {
          console.error('Error al actualizar el docente:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar',
            text: 'No se pudieron guardar los cambios. Intenta nuevamente.',
          });
        }
      );
    } else {
      console.warn('No hay docente seleccionado o faltan datos.');
      Swal.fire({
        icon: 'warning',
        title: 'Datos incompletos',
        text: 'Por favor, selecciona un docente y completa todos los campos antes de guardar.',
      });
    }
  }

  cancelarEdicion(): void {
    this.docenteActual = {};
    this.modoEdicion = false;
    console.log('Edición cancelada');
    Swal.fire({
      icon: 'info',
      title: 'Edición cancelada',
      text: 'Los cambios no se guardaron.',
    });
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario');
    this.apiService.setUsuarioActual(null);
    console.log('Sesión cerrada');
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente.',
    }).then(() => {
      this.router.navigate(['/login']);
    });
  }
}
