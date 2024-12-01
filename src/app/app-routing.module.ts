import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 // IMPORTANTE: Asegúrate de importar este módulo
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';  // Si tienes más componentes, agréguelos aquí

@NgModule({
  declarations: [
    AppComponent,   // Componente principal de tu aplicación
    HomeComponent   // Componente donde usas ApiService
  ],
  imports: [
    BrowserModule,    // Módulo básico de Angular
  
  ],
  providers: [],
  bootstrap: [AppComponent]  // El componente que se muestra al inicio
})
export class AppModule { }
