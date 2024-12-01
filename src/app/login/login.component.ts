import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  alumnos: any[] = [];
  correo: string = '';  // Variable para el nombre de usuario
  password: string = '';  // Variable para la contraseña

  constructor(private apiService: ApiService, private router:Router) {}

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
  }



    
  
  iniciarSesion():void{

    this.apiService.getData().subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
        // Aquí validamos las credenciales
        const usuario = response.alumnosResponse.alumnos.find( 
          (user: any) => user.correo === this.correo && user.password === this.password
        );
        
        if (usuario) {
          // Si se encuentra el usuario, almacenamos los datos en sessionStorage
          sessionStorage.setItem('usuario', JSON.stringify(usuario));  // Guardamos el usuario
          this.router.navigate(['/home']);
        } else {
          alert('Credenciales incorrectas');
        }
        

        
      },
      error => {
        console.error('Error al obtener los datos:', error);
      }
    );
    
    

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