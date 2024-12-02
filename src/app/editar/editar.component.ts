import { Component, OnInit} from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar',
  imports: [CommonModule,FormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css',
  standalone:true
})
export class EditarComponent {
  alumnos: any[] = [];
  usuarioActual: any;
  

  constructor(private apiService: ApiService,private router:Router) {}

  ngOnInit(): void {
    this.apiService.authenticate('root', 'root123').subscribe(
      response => {
        console.log("Respuesta del servidor de autenticación:", response);
        this.apiService.setCredentials('root', 'root123');
      
        console.log("datos cargados :D");
      },
      error => {
        console.error('Error de autenticación:', error);
      }
    );

    if (!this.apiService.isAuthenticated()) {
      console.log('Sesión no iniciada. Redirigiendo al login...');
      this.router.navigate(['/login']); // Redirigir al login si no está autenticado
      return;
    }else{
        console.log("Sesion inciada");
        this.usuarioActual = this.apiService.getUsuarioActual();
        console.log('Datos del usuario actual:', this.usuarioActual);
    }

   console.log("datos cargados");
    
  }
  
  llenarData(): void {

    this.apiService.getData().subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
        if (response && response.alumnosResponse && response.alumnosResponse.alumnos) {
          this.alumnos = response.alumnosResponse.alumnos;
          console.log('Alumnos cargados:', this.alumnos);
        } else {
          console.warn('Estructura de respuesta inesperada:', response);
        }
      },
      error => {
        console.error('Error al obtener los datos:', error);
        this.router.navigate(['/login']); // Redirigir si hay un error al obtener los datos
      }
    );
  }
  guardarCambios(): void {
    const idUsuario = this.usuarioActual.id_alumno;
    if (this.usuarioActual) {
      // Suponiendo que el id está en `id_alumno`
      const id = this.usuarioActual.id_alumno;
      
      // Llamar al servicio para actualizar el usuario
      this.apiService.actualizarUsuario(id, this.usuarioActual).subscribe(
        response => {
          console.log('Usuario actualizado con éxito:', response);
          // Aquí puedes redirigir o mostrar un mensaje de éxito
        },
        error => {
          console.error('Error al actualizar el usuario:', error);
        }
      );
    } else {
      console.log('No se ha encontrado al usuario actual');
    }
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario'); // Elimina los datos del usuario
    this.apiService.setUsuarioActual(null); // Limpia la sesión en el servicio
    console.log('Sesión cerrada');
    this.router.navigate(['/login']); // Redirige al login
  }
}
