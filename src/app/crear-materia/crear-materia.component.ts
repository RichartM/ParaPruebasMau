import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiMateriaService } from '../service/api-materia.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-materia',
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-materia.component.html',
  styleUrls: ['./crear-materia.component.css'],
  standalone: true
})
export class CrearMateriaComponent {

  nuevaMateria: any = {
    nombreMateria: '',
    estado: true
  };

  constructor(private apiService: ApiMateriaService, private router: Router) {}

  ngOnInit(): void {
    if (!this.apiService.isAuthenticated()) {
      console.log('Sesión no iniciada. Redirigiendo al login...');
      this.router.navigate(['/login']);
      return;
    } else {
      console.log('Sesión iniciada correctamente.');
    }
  }

  registrarMateria(): void {
    console.log('Datos del grupo a enviar:', this.nuevaMateria);
    this.apiService.registrarMateria(this.nuevaMateria).subscribe({
      next: (response) => {
        console.log('Grupo registrado con éxito:', response);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Grupo registrado correctamente',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (error) => {
        console.error('Error al registrar el grupo:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al registrar el grupo',
          confirmButtonText: 'Aceptar'
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
