import { Component } from '@angular/core';
import { ApiGruposService } from '../service/api-grupos.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mostrar-grupos',
  imports: [CommonModule, FormsModule],
  templateUrl: './mostrar-grupos.component.html',
  styleUrls: ['./mostrar-grupos.component.css'], // Corregir a styleUrls
  standalone: true
})
export class MostrarGruposComponent {
  grupos: any[] = []; // Almacena la lista de grupos
  usuarioActual: any; // Almacena la información del usuario actual
  grupoActual: any = {}; // Grupo seleccionado para la edición
  modoEdicion: boolean = false; // Modo de edición

  constructor(private apiService: ApiGruposService, private router: Router) {}

  // Este método se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    // Autenticación del usuario
    this.apiService.authenticate('root', 'root123').subscribe(
      (response) => {
        console.log('Respuesta del servidor de autenticación:', response);
        this.apiService.setCredentials('root', 'root123'); // Guardamos las credenciales
        this.llenarData(); // Llamamos a la función para cargar los datos de los grupos
      },
      (error) => {
        console.error('Error de autenticación:', error);
        this.router.navigate(['/login']); // Redirigimos al login si la autenticación falla
      }
    );

    // Verificamos si el usuario está autenticado antes de proceder
    if (!this.apiService.isAuthenticated()) {
      console.log('Sesión no iniciada. Redirigiendo al login...');
      this.router.navigate(['/login']); // Redirigir al login si no está autenticado
      return;
    } else {
      console.log('Sesión iniciada');
      this.usuarioActual = this.apiService.getUsuarioActual(); // Obtener los datos del usuario actual
      console.log('Datos del usuario actual:', this.usuarioActual);
    }
  }

  // Este método obtiene los datos de los grupos desde el servidor
  llenarData(): void {
    this.apiService.getData().subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        if (response && response.grupoResponse && response.grupoResponse.grupos) {
          this.grupos = response.grupoResponse.grupos; // Asignar los grupos al arreglo
          console.log('Grupos cargados:', this.grupos);
        } else {
          console.warn('Estructura de respuesta inesperada:', response);
        }
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
        this.router.navigate(['/login']); // Redirigir al login si hay error
      }
    );
  }

  // Este método se llama cuando el usuario selecciona un grupo para editar
  seleccionarGrupo(grupo: any): void {
    this.grupoActual = { ...grupo }; // Clonamos los datos del grupo para no modificar el original
    this.modoEdicion = true; // Activamos el modo edición
    console.log('Grupo seleccionado para edición:', this.grupoActual);
  }

  // Este método guarda los cambios realizados en un grupo
  guardarCambios(): void {
    if (this.grupoActual && this.grupoActual.id_grupo) {
      const id = this.grupoActual.id_grupo; // Obtenemos el ID del grupo
      this.apiService.actualizarGrupo(id, this.grupoActual).subscribe(
        (response) => {
          console.log('Grupo actualizado con éxito:', response);
          // Actualizamos la lista local de grupos con el grupo modificado
          const index = this.grupos.findIndex((g) => g.id_grupo === id);
          if (index !== -1) {
            this.grupos[index] = { ...this.grupoActual };
          }
          alert('¡Cambios guardados con éxito!'); // Alerta al usuario
          this.modoEdicion = false; // Salimos del modo edición
        },
        (error) => {
          console.error('Error al actualizar el grupo:', error);
          alert('Error al guardar los cambios. Intente nuevamente.');
        }
      );
    } else {
      console.warn('No hay grupo seleccionado o faltan datos');
    }
  }

  // Este método cancela la edición y resetea el formulario
  cancelarEdicion(): void {
    this.grupoActual = {}; // Limpia el modelo del grupo seleccionado
    this.modoEdicion = false; // Salimos del modo edición
    console.log('Edición cancelada');
  }

  // Este método cierra la sesión del usuario
  cerrarSesion(): void {
    sessionStorage.removeItem('usuario'); // Elimina los datos del usuario del sessionStorage
    this.apiService.setUsuarioActual(null); // Limpia la sesión en el servicio
    console.log('Sesión cerrada');
    this.router.navigate(['/login']); // Redirige al login
  }
}
