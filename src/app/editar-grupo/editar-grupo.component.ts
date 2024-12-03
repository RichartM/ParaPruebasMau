import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiGruposService } from '../service/api-grupos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-grupo',
  imports: [CommonModule,FormsModule],
  templateUrl: './editar-grupo.component.html',
  styleUrl: './editar-grupo.component.css',
  standalone: true
})
export class EditarGrupoComponent {
 
}
