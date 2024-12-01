import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule, // Asegúrate de incluirlo aquí
    HomeRoutingModule
  ]
})
export class HomeModule { }
