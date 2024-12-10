import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule], // Asegúrate de que CommonModule esté importado
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
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
  
  cerrarSesion(): void {
    sessionStorage.removeItem('usuario'); // Elimina los datos del usuario
    this.apiService.setUsuarioActual(null); // Limpia la sesión en el servicio
    console.log('Sesión cerrada');
    this.router.navigate(['/login']); // Redirige al login
  }
}
