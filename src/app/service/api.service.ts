import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi = 'http://localhost:8080/v3/alumnos';  // URL del backend
  private username: string = '';  // Aquí puedes guardar las credenciales si es necesario
  private password: string = '';

  constructor(private http: HttpClient) {}

  // Método para autenticar y obtener acceso usando Basic Authentication
  authenticate(username: string, password: string): Observable<any> {
    // Codifica las credenciales en base64
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
    console.log(authHeader);  // Verifica si la codificación es correcta

    // Realiza la solicitud GET con las credenciales de autenticación
    const headers = new HttpHeaders({
      'Authorization': authHeader  // Encabezado con las credenciales codificadas
    });

    return this.http.get(`${this.urlApi}`, { headers, observe: 'response' });
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

}