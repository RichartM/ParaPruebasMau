import { Component } from '@angular/core';
import { ApiProfesorService } from '../service/api-profesor.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mostrar-profesor',
  imports: [CommonModule,FormsModule],
  templateUrl: './mostrar-profesor.component.html',
  styleUrl: './mostrar-profesor.component.css',
  standalone: true
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
        this.router.navigate(['/login']);
      }
    );

    if (!this.apiService.isAuthenticated()) {
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
        }
      },
      (error) => {
        console.error('Error al obtener datos de docentes:', error);
     
      }
    );
  }

  seleccionarDocente(docente: any): void {
    this.docenteActual = { ...docente }; // Clonamos el docente seleccionado
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
          alert('¡Cambios guardados con éxito!');
          this.modoEdicion = false;
        },
        (error) => {
          console.error('Error al actualizar el docente:', error);
          alert('Error al guardar los cambios. Intente nuevamente.');
        }
      );
    } else {
      console.warn('No hay docente seleccionado o faltan datos');
    }
  }

  cancelarEdicion(): void {
    this.docenteActual = {};
    this.modoEdicion = false;
    console.log('Edición cancelada');
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario');
    this.apiService.setUsuarioActual(null);
    this.router.navigate(['/login']);
  }

}
