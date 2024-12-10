import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule, // Asegúrate de incluirlo aquí
    AdminRoutingModule
  ]
})
export class AdminModule { }
