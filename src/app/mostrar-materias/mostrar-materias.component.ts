import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiMateriaService } from '../service/api-materia.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-materias',
  templateUrl: './mostrar-materias.component.html',
  styleUrls: ['./mostrar-materias.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MostrarMateriasComponent {
  materias: any[] = [];
  usuarioActual: any;
  materiaSeleccionada: any = {}; 
  modoEdicion: boolean = false;

  constructor(private apiService: ApiMateriaService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.authenticate('root', 'root123').subscribe(
      response => {
        console.log("Respuesta del servidor de autenticación:", response);
        this.apiService.setCredentials('root', 'root123');
        this.llenarData();  
      },
      error => {
        console.error('Error de autenticación:', error);
      }
    );

    if (!this.apiService.isAuthenticated()) {
      console.log('Sesión no iniciada. Redirigiendo al login...');
      this.router.navigate(['/login']); 
      return;
    } else {
      console.log("Sesión iniciada");
      this.usuarioActual = this.apiService.getUsuarioActual();
      console.log('Datos del usuario actual:', this.usuarioActual);
    }
  }

  llenarData(): void {
    this.apiService.getData().subscribe(
      response => {
        if (response && response.materiaResponse && response.materiaResponse.materias) {
          this.materias = response.materiaResponse.materias;
        } else {
          console.warn('Estructura de respuesta inesperada:', response);
        }
      },
      error => {
        console.error('Error al obtener los datos:', error);
        this.router.navigate(['/login']); 
      }
    );
  }

  cargarDatos(materia: any): void {
    this.materiaSeleccionada = { ...materia };
    console.log('Materia seleccionada:', this.materiaSeleccionada);
    this.modoEdicion = true;
  }
  
  guardarCambios(): void {
    if (this.materiaSeleccionada && this.materiaSeleccionada.idMateria) {
      this.apiService.actualizarMateria(this.materiaSeleccionada, this.materiaSeleccionada.idMateria).subscribe(
        (response) => {
          console.log('Materia actualizada:', response);
          Swal.fire('¡Éxito!', '¡Cambios guardados con éxito!', 'success');
          this.modoEdicion = false; 
        },
        (error) => {
          console.error('Error al guardar los cambios:', error);
          Swal.fire('Error', 'Error al guardar los cambios. Intente nuevamente.', 'error');
        }
      );
    } else {
      console.error('Error: La materia seleccionada no tiene un id válido');
      Swal.fire('Advertencia', 'Por favor, complete todos los campos antes de guardar.', 'warning');
    }
  }

  cancelarEdicion(): void {
    this.materiaSeleccionada = {}; 
    this.modoEdicion = false;
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario');
    this.apiService.setUsuarioActual(null);
    this.router.navigate(['/login']);
  }
}
