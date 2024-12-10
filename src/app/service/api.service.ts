import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private usuarioActual: any = null;

  private username: string = '';  // Aquí puedes guardar las credenciales si es necesario
  private password: string = '';

  constructor(private http: HttpClient) {}

  private urlApi = 'http://localhost:8080/login';  // URL de login del backend


  // Método para autenticar con POST (con el cuerpo de la solicitud)
  authenticate(email: string, password: string): Observable<any> {
    // Crea el objeto con las credenciales para enviar en el cuerpo de la solicitud
    const credentials = { email, password };

    // Configura las cabeceras si es necesario (puedes añadir el tipo de contenido)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Realiza la solicitud POST con las credenciales en el cuerpo
    return this.http.post(this.urlApi, credentials, { headers });
  }

  // Método para obtener los datos de alumnos
  getData(): Observable<any> {
    // Envío de la solicitud con el encabezado de autenticación básica
    const authHeader = `Basic ${btoa(`${this.username}:${this.password}`)}`;  // Usando las credenciales codificadas
    const headers = new HttpHeaders({
      'Authorization': authHeader
    });

    return this.http.get(`${this.urlApi}`, { headers });
  }

  

  // Método para guardar las credenciales de autenticación si es necesario
  setCredentials(username: string, password: string): void {
    this.username = username;
    this.password = password;
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('usuario'); // Devuelve true si hay usuario
  }

  // Método para guardar los datos del usuario en el servicio
  setUsuarioActual(usuario: any): void {
    this.usuarioActual = usuario;
  }

  // Obtener los datos del usuario actual
  getUsuarioActual(): any {
    return this.usuarioActual;
  }

  // Método para actualizar los datos del usuario
  actualizarUsuario(id: number, usuario: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`${this.username}:${this.password}`)}`
    });
    

    return this.http.put(`${this.urlApi}/${id}`, usuario, { headers });
  }

  registrarAlumno(alumno: any): Observable<any> {
    return this.http.post(this.urlApi, alumno);
  }
  
}
