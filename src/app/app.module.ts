
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EditarComponent } from './editar/editar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule // Incluye CommonModule de forma predeterminada
  ],
  providers: [],
  bootstrap: [AppComponent,EditarComponent]
})
export class AppModule { }
