import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Importa RouterModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const usuario = sessionStorage.getItem('usuario'); // Recupera los datos del usuario
    if (usuario) {
      this.apiService.setUsuarioActual(JSON.parse(usuario)); // Establece la sesión activa
      console.log('Sesión restaurada:', JSON.parse(usuario));
    } else {
      console.log('No hay sesión activa');
      this.router.navigate(['/login']); // Redirige al login si no hay sesión
    }
  }
}
