import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // Asegúrate de que CommonModule esté importado
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  alumnos: any[] = [];
  usuarioActual: any;

  constructor(private apiService: ApiService,private router:Router) {}

  ngOnInit(): void {
    this.apiService.authenticate('root', 'root123').subscribe(
      response => {
        console.log("Respuesta del servidor de autenticación:", response);
        this.apiService.setCredentials('root', 'root123');
        this.llenarData();
        console.log("Autorizado :D");
      },
      error => {
        console.error('Error de autenticación:', error);
      }
    );

     // Verificamos si el usuario está autenticado
     this.usuarioActual = this.apiService.getData();

     if (!this.usuarioActual) {
       // Si no hay usuario autenticado, redirigimos al login
       this.router.navigate(['/login']);
     } else {
       // Si el usuario está autenticado, cargamos los datos
       console.log('Usuario autenticado:', this.usuarioActual);
       this.llenarData();
     }
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
      }
    );
  }
}
