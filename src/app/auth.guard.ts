import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const usuario = sessionStorage.getItem('usuario');
    if (usuario) {
      return true; // Permitir acceso
    } else {
      this.router.navigate(['/login']); // Redirigir al login
      return false;
    }
  }
}
